"use client";

interface Props {
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export default function TextPanel({
  value,
  onChange,
  placeholder,
  readOnly = false,
}: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`
        h-56 w-full resize-none
        rounded-xl border p-3 text-sm
        transition-all
        ${
          readOnly
            ? `
              bg-gray-50
              border-gray-200
              text-gray-700
            `
            : `
              bg-white
              border-gray-300
              hover:border-blue-400
              focus:outline-none
              focus:ring-1 focus:ring-blue-400
            `
        }
        placeholder:text-gray-400 text-gray-800
      `}
    />
  );
}
