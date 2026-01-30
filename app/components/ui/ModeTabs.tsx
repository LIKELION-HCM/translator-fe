import { Mode } from "../SmartTranslator";

export default function ModeTabs({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div className="flex gap-2">
      {(["text", "file"] as Mode[]).map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`px-3 py-2 text-sm rounded-lg border transition ${
            mode === m
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          Translate {m === "text" ? "Text" : "File"}
        </button>
      ))}
    </div>
  );
}
