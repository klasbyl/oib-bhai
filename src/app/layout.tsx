import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OIB SaaS Consultancy AI Assistant",
  description: "Professional SaaS consultancy AI assistant powered by OIB. Expert guidance across the entire SaaS ecosystem from strategy to implementation.",
  keywords: "SaaS, consultancy, AI assistant, digital transformation, enterprise software, cloud solutions",
  authors: [{ name: "OIB (One In A Billion)" }],
  creator: "OIB",
  publisher: "OIB",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicons/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/favicons/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/favicons/android-chrome-512x512.png' },
      { rel: 'manifest', url: '/favicons/site.webmanifest' },
    ],
  },
  manifest: '/favicons/site.webmanifest',
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1c1c1c' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon links for browsers that don't support metadata API */}
        <link rel="icon" type="image/x-icon" href="/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />

        {/* PWA and mobile optimization */}
        <meta name="theme-color" content="#1c1c1c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="OIB AI Assistant" />

        {/* Open Graph meta tags for social sharing */}
        <meta property="og:title" content="OIB SaaS Consultancy AI Assistant" />
        <meta property="og:description" content="Professional SaaS consultancy AI assistant powered by OIB. Expert guidance across the entire SaaS ecosystem." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/favicons/android-chrome-512x512.png" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="OIB SaaS Consultancy AI Assistant" />
        <meta name="twitter:description" content="Professional SaaS consultancy AI assistant powered by OIB." />

        {/* Additional SEO and performance meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
