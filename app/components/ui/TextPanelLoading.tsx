export default function TextPanelLoading() {
  return (
    <div className="h-56 w-full rounded-xl border border-gray-200 bg-gray-50 p-3 flex flex-col justify-between">
      <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
        <div className="h-4 bg-gray-300 rounded w-2/3" />
      </div>

      <div className="text-xs text-gray-500 flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-ping" />
        Translating…
      </div>
    </div>
  );
}
