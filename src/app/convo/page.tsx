import { Suspense } from "react";
import ConvoPage from "@/components/ConvoPage";
import LoadingSpinner from "@/components/LoadingSpinner";

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
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ConvoPage />
    </Suspense>
  );
}
