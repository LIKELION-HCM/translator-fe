"use client";

import { KeyRound } from "lucide-react";
import { useEffect, useState } from "react";

export default function ApiKeyCard() {
  const [key, setKey] = useState("");

  useEffect(() => {
    const k = localStorage.getItem("OPENAI_API_KEY");
    if (k) setKey(k);
  }, []);

  const save = (v: string) => {
    setKey(v);
    localStorage.setItem("OPENAI_API_KEY", v);
  };

  return (
    <div className="mt-6 bg-white shadow rounded-xl px-4 py-3 flex items-center text-gray-800 gap-3 w-[420px]">
      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
        <KeyRound className="w-4 h-4 text-blue-600" />
      </div>
      <input
        type="password"
        value={key}
        onChange={(e) => save(e.target.value)}
        placeholder="sk-..."
        className="flex-1 text-sm outline-none"
      />
    </div>
  );
}
