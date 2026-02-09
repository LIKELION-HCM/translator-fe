"use client";

import { FileText, Upload, X } from "lucide-react";
import { useRef } from "react";

export default function FilePanel({
  file,
  onChange,
}: {
  file: File | null;
  onChange: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <label
      className={`w-full rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition
        ${
          file
            ? "border-blue-300 bg-blue-50"
            : "h-56 border-gray-300 hover:border-blue-400 bg-white"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />

      {!file ? (
        <div className="flex flex-col items-center text-gray-500 gap-2">
          <Upload className="w-6 h-6" />
          <div className="text-sm font-medium">
            Drag & drop or click to upload
          </div>
          <div className="text-xs text-gray-400">Supported: PDF, DOCX, TXT</div>
        </div>
      ) : (
        <div className="relative w-full h-full p-4 flex items-center">
          <FileText className="w-8 h-8 text-blue-600 mr-3" />

          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-medium text-gray-800 truncate">
              {file.name}
            </div>
            <div className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="ml-3 p-1 rounded-full hover:bg-gray-200 transition"
            title="Remove file"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}
    </label>
  );
}
