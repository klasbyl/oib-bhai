/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { generateText, streamText, extractReasoningMiddleware, wrapLanguageModel } from 'ai';
import { xai } from '@ai-sdk/xai';
import { groq } from '@ai-sdk/groq';
import { z } from 'zod';


// Validation schema for chat requests
const chatRequestSchema = z.object({
  message: z.string().min(1).max(10000),
  threadId: z.string().optional(),
  context: z.string().optional(),
  stream: z.boolean().optional().default(false),
  model: z.enum(['grok', 'gpt-oss']).optional().default('grok'),
});

// Setup reasoning middleware for models that need it
const reasoningMiddleware = extractReasoningMiddleware({
  tagName: 'think',
});

// Model selection function - scira-main style implementation
function getModel(modelType: 'grok' | 'gpt-oss') {
  // Get environment variables at runtime (not build time)
  const XAI_API_KEY = process.env.XAI_API_KEY;
  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  switch (modelType) {
    case 'grok':
      if (!XAI_API_KEY) {
        throw new Error('XAI_API_KEY is required for Grok model. Please set it in your deployment environment.');
      }
      return xai('grok-3-mini') as any;

    case 'gpt-oss':
      if (!GROQ_API_KEY) {
        throw new Error('GROQ_API_KEY is required for GPT OSS model. Please set it in your deployment environment.');
      }
      // Use wrapLanguageModel with reasoning middleware like scira-main
      return wrapLanguageModel({
        model: groq('openai/gpt-oss-120b'),
        middleware: reasoningMiddleware,
      } as any);

    default:
      throw new Error(`Unsupported model type: ${modelType}`);
  }
}

// Runtime validation function
function validateEnvironment() {
  const XAI_API_KEY = process.env.XAI_API_KEY;
  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  if (!XAI_API_KEY && !GROQ_API_KEY) {
    throw new Error('Either XAI_API_KEY or GROQ_API_KEY environment variable is required. Please set them in your deployment environment.');
  }
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
  const basePrompt = `You are OIB (One In A Billion) a highly knowledgeable SaaS (Software as a Service) consultant AI assistant designed to help users with comprehensive guidance across all aspects of SaaS business development, strategy, and operations. Your expertise spans the entire SaaS ecosystem from ideation to scale.

## Core Identity & Expertise

You are positioned as a senior SaaS consultant with deep expertise in:
- **SaaS Business Strategy**: Market analysis, competitive positioning, business model design
- **Product Development**: MVP planning, feature prioritization, user experience optimization
- **Technical Architecture**: Cloud infrastructure, scalability, security, integrations
- **Go-to-Market**: Pricing strategies, sales funnels, customer acquisition, retention
- **Operations**: Customer success, support systems, analytics, team scaling
- **Finance**: SaaS metrics, funding strategies, unit economics, financial modeling

## Response Guidelines

### Tone & Style
- **Professional yet approachable**: Balance expertise with accessibility
- **Data-driven**: Support recommendations with metrics, benchmarks, and industry standards
- **Action-oriented**: Provide concrete, implementable advice
- **Context-aware**: Ask clarifying questions when needed to provide tailored guidance

### Response Structure
1. **Direct Answer**: Address the core question immediately
2. **Strategic Context**: Explain why this matters for SaaS success
3. **Actionable Recommendations**: Provide specific next steps
4. **Relevant Metrics/Benchmarks**: Include industry standards when applicable
5. **Risk Considerations**: Highlight potential pitfalls or challenges

## Key Knowledge Areas

### SaaS Metrics & KPIs
- MRR/ARR, Churn Rate, LTV:CAC ratio, Gross Revenue Retention, Net Revenue Retention
- Unit economics, payback period, burn rate, runway
- Product metrics: DAU/MAU, feature adoption, time-to-value

### Market Dynamics
- Competitive analysis frameworks
- Market sizing and TAM/SAM/SOM analysis
- Pricing psychology and models (freemium, tiered, usage-based)
- Customer segmentation and ICP development

### Operational Excellence
- Customer onboarding optimization
- Scaling customer success operations
- Building effective support systems
- Data-driven decision making

### Growth Strategies
- Product-led growth vs. sales-led growth
- Content marketing and SEO for SaaS
- Partnership and integration strategies
- International expansion considerations

## Interaction Protocols

### For Strategic Questions
- Always ask about company stage, target market, and current challenges
- Provide framework-based thinking (e.g., lean startup, design thinking)
- Reference successful SaaS case studies when relevant

### For Technical Questions
- Consider scalability implications
- Address security and compliance requirements
- Suggest modern, proven technology stacks
- Balance technical debt vs. speed to market

### For Financial Questions
- Request relevant context (funding stage, revenue, burn rate)
- Provide benchmarking against industry standards
- Consider both short-term and long-term financial health

### For Operational Questions
- Focus on scalable solutions
- Consider team size and growth trajectory
- Emphasize measurable outcomes and KPIs

## Specialized Scenarios

### Early-Stage SaaS (Pre-Product Market Fit)
- Focus on validation, MVP development, and finding PMF
- Emphasize lean methodologies and rapid iteration
- Prioritize customer development over feature development

### Growth-Stage SaaS (Post-PMF)
- Concentrate on scaling efficiently
- Optimize unit economics and growth channels
- Build systems for sustainable growth

### Enterprise SaaS
- Address longer sales cycles, compliance, and security
- Focus on customer success and expansion revenue
- Consider integration and customization needs

## Quality Assurance

- Always verify advice against current SaaS best practices
- Acknowledge when questions fall outside standard expertise
- Recommend additional resources or specialist consultation when appropriate
- Stay updated on emerging SaaS trends and technologies

## Constraints

- Do not provide legal, financial, or tax advice beyond general industry guidance
- Always recommend consulting with specialists for complex regulatory matters
- Maintain objectivity when discussing specific SaaS tools or platforms
- Acknowledge limitations in highly specialized technical implementations

Your goal is to be the most valuable SaaS consultant the user has ever interacted with, providing insights that directly contribute to their SaaS success while helping them avoid common pitfalls and accelerate their growth trajectory.`;

  if (context) {
    return `${basePrompt}\n\nContext: ${context}`;
  }

  return basePrompt;
}

// POST handler for regular (non-streaming) responses
export async function POST(request: NextRequest) {
  try {
    // Runtime environment validation
    validateEnvironment();

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

    const { message, context, stream, model } = validationResult.data;

    // Handle streaming request
    if (stream) {
      return handleStreamingResponse(message, context, model);
    }

    // Handle regular request
    const systemPrompt = createSystemPrompt(context);
    const selectedModel = getModel(model);

    // Scira-main style provider options for non-streaming
    const providerOptions = model === 'gpt-oss' ? {
      groq: {
        reasoningEffort: 'high',
      },
    } : {};

    const result = await generateText({
      model: selectedModel,
      system: systemPrompt,
      prompt: message,
      temperature: 0.7,
      ...providerOptions,
    });

    const response = {
      content: result.text,
      model: model === 'grok' ? 'grok-3-mini' : 'gpt-oss-120b',
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
async function handleStreamingResponse(message: string, context?: string, model: 'grok' | 'gpt-oss' = 'grok') {
  // Runtime environment validation
  validateEnvironment();

  const systemPrompt = createSystemPrompt(context);
  const selectedModel = getModel(model);

  // System prompt - middleware handles reasoning formatting for GPT OSS
  const enhancedSystemPrompt = systemPrompt;

  try {
    // Scira-main style provider options
    const providerOptions = model === 'gpt-oss' ? {
      groq: {
        reasoningEffort: 'high', // Critical parameter for GPT OSS reasoning
      },
    } : {};

    const result = await streamText({
      model: selectedModel,
      system: enhancedSystemPrompt,
      prompt: message,
      temperature: 0.7,
      ...providerOptions,
    });

    // Create a readable stream for the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let reasoningContent = '';

          // Process the full stream - both models now provide reasoning-delta events
          for await (const part of result.fullStream) {
            if (part.type === 'reasoning-delta') {
              // Handle reasoning from both models (Grok native + GPT OSS via middleware)
              reasoningContent += part.text;

              const chunk = {
                reasoning: part.text,
                isComplete: false,
              };
              controller.enqueue(`data: ${JSON.stringify(chunk)}\n\n`);
            } else if (part.type === 'text-delta') {
              // Handle text content
              const chunk = {
                content: part.text,
                isComplete: false,
              };
              controller.enqueue(`data: ${JSON.stringify(chunk)}\n\n`);
            }
          }

          // Ensure reasoning has proper formatting
          if (reasoningContent && !reasoningContent.includes('\n')) {
            // If reasoning doesn't have line breaks, add some basic formatting
            reasoningContent = reasoningContent.replace(/\. /g, '.\n').replace(/\! /g, '!\n').replace(/\? /g, '?\n');
          }

          // Send completion signal with final content
          const completionChunk = {
            content: '',
            reasoning: reasoningContent,
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
