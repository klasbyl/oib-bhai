import Homepage from "@/components/Homepage";

export const metadata = {
  title: "One In a Billion - AI Assistant",
  description: "Get smarter responses and explore more with our AI assistant",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function Home() {
  return <Homepage />;
}
