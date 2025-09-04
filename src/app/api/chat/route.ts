import { NextRequest, NextResponse } from 'next/server';
import { generateText, streamText } from 'ai';
import { xai } from '@ai-sdk/xai';
import { z } from 'zod';

// Validation schema for chat requests
const chatRequestSchema = z.object({
  message: z.string().min(1).max(10000),
  threadId: z.string().optional(),
  context: z.string().optional(),
  stream: z.boolean().optional().default(false),
});

// Environment variable validation
const XAI_API_KEY = process.env.XAI_API_KEY;

if (!XAI_API_KEY) {
  throw new Error('XAI_API_KEY environment variable is required');
}

// Rate limiting (simple in-memory store - in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = request.headers.get('x-client-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) return realIP;
  if (clientIP) return clientIP;

  return 'unknown';
}

// Helper function to create system prompt
function createSystemPrompt(context?: string): string {
  const basePrompt = `You are Grok, a helpful and maximally truthful AI built by xAI. You are not based on any other companies and their models.

You should:
- Be helpful and provide accurate information
- Be maximally truthful
- Use clear, concise language
- When appropriate, provide reasoning for your answers
- Stay on topic and relevant to the user's query
- If you don't know something, admit it rather than making up information

Guidelines:
- Keep responses focused and relevant
- Use proper formatting when helpful (lists, code blocks, etc.)
- Be conversational but professional
- Respect user privacy and don't ask for unnecessary personal information`;

  if (context) {
    return `${basePrompt}\n\nContext: ${context}`;
  }

  return basePrompt;
}

// POST handler for regular (non-streaming) responses
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.',
          retryable: true
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = chatRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request',
          message: validationResult.error.issues.map(issue => issue.message).join(', '),
          retryable: false
        },
        { status: 400 }
      );
    }

    const { message, context, stream } = validationResult.data;

    // Handle streaming request
    if (stream) {
      return handleStreamingResponse(message, context);
    }

    // Handle regular request
    const systemPrompt = createSystemPrompt(context);

    const result = await generateText({
      model: xai('grok-3-mini'),
      system: systemPrompt,
      prompt: message,
      temperature: 0.7,
    });

    const response = {
      content: result.text,
      model: 'grok-3-mini',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Chat API error:', error);

    // Handle specific AI SDK errors
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          {
            error: 'AI service rate limit',
            message: 'AI service is currently busy. Please try again later.',
            retryable: true
          },
          { status: 429 }
        );
      }

      if (error.message.includes('authentication')) {
        return NextResponse.json(
          {
            error: 'Authentication error',
            message: 'AI service authentication failed.',
            retryable: false
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Something went wrong. Please try again.',
        retryable: true
      },
      { status: 500 }
    );
  }
}

// Handle streaming responses
async function handleStreamingResponse(message: string, context?: string) {
  const systemPrompt = createSystemPrompt(context);

  try {
    const result = await streamText({
      model: xai('grok-3-mini'),
      system: systemPrompt,
      prompt: message,
      temperature: 0.7,
    });

    // Create a readable stream for the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const delta of result.textStream) {
            const chunk = {
              content: delta,
              isComplete: false,
            };
            controller.enqueue(`data: ${JSON.stringify(chunk)}\n\n`);
          }

          // Send completion signal
          const completionChunk = {
            content: '',
            isComplete: true,
            timestamp: new Date().toISOString(),
          };
          controller.enqueue(`data: ${JSON.stringify(completionChunk)}\n\n`);

        } catch (error) {
          console.error('Streaming error:', error);
          const errorChunk = {
            error: 'Streaming failed',
            isComplete: true,
          };
          controller.enqueue(`data: ${JSON.stringify(errorChunk)}\n\n`);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Streaming setup error:', error);
    return NextResponse.json(
      {
        error: 'Streaming setup failed',
        message: 'Failed to initialize streaming response.',
        retryable: true
      },
      { status: 500 }
    );
  }
}
