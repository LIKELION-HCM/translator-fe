"use client";

import buildTranslatedFileName from "@/helper/buildTranslatedFileName";
import { CheckCircle, FileText } from "lucide-react";

interface Props {
  loading?: boolean;
  fileId?: string | null;
  originalFileName?: string | null;
}

export default function FileResultPanel({
  loading,
  fileId,
  originalFileName,
}: Props) {
  if (loading) {
    return (
      <div className="h-56 border rounded-xl bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-gray-500 text-sm">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          Translating file…
        </div>
      </div>
    );
  }

  if (!fileId || !originalFileName) {
    return <div className="h-56 border rounded-xl bg-gray-50" />;
  }

  const translatedName = buildTranslatedFileName(originalFileName);

  return (
    <div className="border rounded-xl p-4 text-sm flex flex-col gap-3">
      <div className="flex items-center gap-2 text-green-600 font-medium">
        <CheckCircle className="w-4 h-4" />
        Translation completed
      </div>

      <div className="flex items-center gap-2 text-gray-700">
        <FileText className="w-4 h-4" />
        <span className="truncate">{translatedName}</span>
      </div>
    </div>
  );
}
