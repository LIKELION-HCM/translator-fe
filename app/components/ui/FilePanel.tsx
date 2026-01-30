export default function FilePanel({
  file,
  onChange,
}: {
  file: File | null;
  onChange: (f: File | null) => void;
}) {
  return (
    <label className="h-56 border-2 border-dashed rounded-xl flex items-center justify-center text-sm text-gray-500 cursor-pointer">
      <input
        type="file"
        hidden
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
      {file ? file.name : "Drag & drop or click to upload"}
    </label>
  );
}
