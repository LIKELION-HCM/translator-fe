"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  value?: string;
  defaultValue?: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Dropdown({
  value,
  defaultValue,
  options,
  onChange,
  placeholder = "Select",
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const ref = useRef<HTMLDivElement>(null);

  const selectedValue = value ?? internalValue;
  const selected = options.find(o => o.value === selectedValue);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="
          w-full h-10 px-3
          flex items-center justify-between
          rounded-md border border-gray-300
          bg-white text-sm min-w-[120px]
          hover:border-blue-400
          focus:outline-none focus:ring-1 focus:ring-blue-400
        "
      >
        <span className={selected ? "text-gray-900" : "text-gray-400"}>
          {selected?.label || placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute z-30 mt-1 w-full
            rounded-md border bg-white
            shadow-[0_6px_20px_rgba(0,0,0,0.08)]
            animate-in fade-in zoom-in-95
          "
        >
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setInternalValue(opt.value);
                onChange(opt.value);
                setOpen(false);
              }}
              className={`
                w-full px-3 py-2 text-left text-sm
                hover:bg-blue-50
                ${
                  opt.value === selectedValue
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-900"
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
