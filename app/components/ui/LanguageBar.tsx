"use client";

import Dropdown from "./Dropdown";

type InputProps = {
  variant: "input";
  sourceLang: string;
  optimize: string;
  onSourceChange: (v: string) => void;
  onOptimizeChange: (v: string) => void;
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

export default function LanguageBar(props: Props) {
  return (
    <div className="flex items-center justify-between mb-2">
      {props.variant === "input" ? (
        <>
          <div className="flex gap-2 ml-4">
            <Dropdown
              options={SOURCE_LANGUAGES}
              value={props.sourceLang}
              onChange={props.onSourceChange}
            />
          </div>
        </>
      ) : (
        <div className="ml-4">
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
