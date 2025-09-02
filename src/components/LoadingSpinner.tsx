export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#504e4e] border-t-white rounded-full animate-spin"></div>
        <div className="text-white text-lg font-medium">Loading...</div>
      </div>
    </div>
  );
}
