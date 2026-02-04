"use client";

import { Copy, Download } from "lucide-react";
import { useState } from "react";
import { Mode } from "../SmartTranslator";

export default function ActionBar({
  mode,
  disabled,
  output,
  hasResult,
  handleTranslate,
}: {
  mode: Mode;
  disabled: boolean;
  output: string;
  hasResult: boolean;
  handleTranslate: () => void;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        disabled={disabled}
        onClick={handleTranslate}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-40"
      >
        Translate
      </button>

      {hasResult &&
        (mode === "text" ? (
          <button
            onClick={() => {
              navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-gray-800"
          >
            <Copy className="w-4 h-4 text-gray-800" />
            {copied ? "Copied" : "Copy"}
          </button>
        ) : (
          <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-gray-800">
            <Download className="w-4 h-4 text-gray-800" /> Download
          </button>
        ))}
    </div>
  );
}
