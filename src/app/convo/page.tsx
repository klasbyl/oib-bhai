import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/LoadingSpinner";

const ConvoPage = dynamic(() => import("@/components/ConvoPage"), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

export const metadata = {
  title: "Conversation - One In a Billion",
  description: "Chat with AI assistant",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function Convo() {
  return <ConvoPage />;
}
