export default function FileResultPanel({ file }: { file?: File | null }) {
  if (!file) {
    return <div className="h-56 border rounded-xl bg-gray-50" />;
  }

  return (
    <div className="h-56 border rounded-xl p-4 text-sm flex flex-col gap-2">
      <div className="font-medium truncate">{file.name}</div>
      <div className="text-gray-500">Type: {file.type || "unknown"}</div>
      <div className="text-gray-500">
        Size: {(file.size / 1024).toFixed(1)} KB
      </div>
    </div>
  );
}
