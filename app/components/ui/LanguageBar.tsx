"use client";

import { ArrowLeftRight } from "lucide-react";
import Dropdown from "./Dropdown";

type InputProps = {
  variant: "input";
  sourceLang: string;
  optimize: string;
  onSourceChange: (v: string) => void;
  onOptimizeChange: (v: string) => void;
  onSwap: () => void;
};

type OutputProps = {
  variant: "output";
  targetLang: string;
  onTargetChange: (v: string) => void;
};

type Props = InputProps | OutputProps;

const SOURCE_LANGUAGES = [
  { value: "detect", label: "Detect language" },
  { value: "english", label: "English" },
  { value: "vietnamese", label: "Vietnamese" },
  { value: "korean", label: "Korean" },
];

const TARGET_LANGUAGES = [
  { value: "english", label: "English" },
  { value: "vietnamese", label: "Vietnamese" },
  { value: "korean", label: "Korean" },
];

const OPTIMIZES = [
  { value: "general", label: "General" },
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "technical", label: "Technical" },
];

export default function LanguageBar(props: Props) {
  return (
    <div className="flex items-center justify-between mb-2">
      {props.variant === "input" ? (
        <>
          <div className="flex gap-2">
            <Dropdown
              options={SOURCE_LANGUAGES}
              value={props.sourceLang}
              onChange={props.onSourceChange}
            />

            <Dropdown
              options={OPTIMIZES}
              value={props.optimize}
              onChange={props.onOptimizeChange}
            />
          </div>

          <button
            onClick={props.onSwap}
            className="p-1 rounded-lg hover:bg-gray-100"
            title="Swap languages"
          >
            <ArrowLeftRight className="w-4 h-4 text-gray-500" />
          </button>
        </>
      ) : (
        <div>
          <Dropdown
            options={TARGET_LANGUAGES}
            value={props.targetLang}
            onChange={props.onTargetChange}
          />
        </div>
      )}
    </div>
  );
}
