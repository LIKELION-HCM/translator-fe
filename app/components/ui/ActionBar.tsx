"use client";

import { Copy, Download } from "lucide-react";
import { Mode } from "../SmartTranslator";

export default function ActionBar({
  mode,
  disabled,
  output,
  hasResult,
}: {
  mode: Mode;
  disabled: boolean;
  output: string;
  hasResult: boolean;
}) {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        disabled={disabled}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-40"
      >
        Translate
      </button>

      {hasResult &&
        (mode === "text" ? (
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-lg"
          >
            <Copy className="w-4 h-4" /> Copy
          </button>
        ) : (
          <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-lg">
            <Download className="w-4 h-4" /> Download
          </button>
        ))}
    </div>
  );
}
