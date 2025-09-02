export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-4 h-4 border border-[#504e4e] border-t-white rounded-full animate-spin"></div>
        <div className="text-white text-xs font-normal opacity-40">Loading...</div>
      </div>
    </div>
  );
}
