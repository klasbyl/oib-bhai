export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-6 h-6 border-2 border-[#504e4e] border-t-white rounded-full animate-spin"></div>
        <div className="text-white text-xs font-normal opacity-60">Preparing chat...</div>
      </div>
    </div>
  );
}
