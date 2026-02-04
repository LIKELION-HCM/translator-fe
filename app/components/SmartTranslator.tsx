"use client";

import api from "@/lib/api";
import { ArrowLeftRight } from "lucide-react";
import { useRef, useState } from "react";
import ActionBar from "./ui/ActionBar";
import FilePanel from "./ui/FilePanel";
import FileResultPanel from "./ui/FileResultPanel";
import Header from "./ui/Header";
import Hero from "./ui/Hero";
import LanguageBar from "./ui/LanguageBar";
import ModeTabs from "./ui/ModeTabs";
import TextPanel from "./ui/TextPanel";
import TextPanelLoading from "./ui/TextPanelLoading";

export type Mode = "text" | "file";

export default function SmartTranslator() {
  const lastSourceLangRef = useRef("english");

  const [mode, setMode] = useState<Mode>("text");

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [translatedFile, setTranslatedFile] = useState<File | null>(null);

  const [sourceLang, setSourceLang] = useState("detect");
  const [targetLang, setTargetLang] = useState("vietnamese");
  const [optimize, setOptimize] = useState("general");

  const [isTranslating, setIsTranslating] = useState(false);

  const canTranslate = mode === "text" ? inputText.trim() !== "" : !!file;

  const swapLanguage = () => {
    if (sourceLang === "detect") {
      const prevSource = lastSourceLangRef.current;

      setSourceLang(targetLang);
      setTargetLang(prevSource);
      return;
    }

    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handleSourceChange = (lang: string) => {
    if (lang === "detect") {
      setSourceLang("detect");
      return;
    }

    lastSourceLangRef.current = lang;

    setSourceLang(lang);

    if (lang === targetLang) {
      setTargetLang(
        sourceLang === "detect" ? lastSourceLangRef.current : sourceLang,
      );
    }
  };

  const handleTargetChange = (lang: string) => {
    setTargetLang(lang);

    if (lang === sourceLang) {
      setSourceLang(lastSourceLangRef.current);
    }
  };

  const handleTranslate = async () => {
    if (!canTranslate) return;

    setIsTranslating(true);
    setOutputText("");
    setTranslatedFile(null);

    try {
      const res = await api.post("/api/v1/translate/text", {
        source_lang: sourceLang,
        target_lang: targetLang,
        text: inputText,
      });

      setOutputText(res.data.translated_text);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#DDEFFF] to-white min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto px-4 mt-10">
        <Hero />
        {/* <ApiKeyCard /> */}

        <div className="mt-8 bg-white rounded-2xl shadow p-5">
          <ModeTabs mode={mode} onChange={setMode} />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="relative">
              <LanguageBar
                variant="input"
                sourceLang={sourceLang}
                optimize={optimize}
                onSourceChange={handleSourceChange}
                onOptimizeChange={setOptimize}
              />

              {mode === "text" ? (
                <TextPanel
                  value={inputText}
                  onChange={setInputText}
                  placeholder="Enter text"
                />
              ) : (
                <FilePanel file={file} onChange={setFile} />
              )}

              <button
                onClick={swapLanguage}
                disabled={isTranslating}
                className="absolute top-1 -right-6 z-10 w-9 h-9 rounded-full bg-white border shadow-sm flex items-center justify-center hover:bg-gray-100 active:scale-95 disabled:opacity-40 transition"
                title="Swap languages"
              >
                <ArrowLeftRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div>
              <LanguageBar
                variant="output"
                targetLang={targetLang}
                onTargetChange={handleTargetChange}
              />

              {mode === "text" ? (
                isTranslating ? (
                  <TextPanelLoading />
                ) : (
                  <TextPanel
                    value={outputText}
                    readOnly
                    placeholder="Translation"
                  />
                )
              ) : (
                <FileResultPanel file={translatedFile} />
              )}
            </div>
          </div>

          <ActionBar
            mode={mode}
            disabled={!canTranslate}
            output={outputText}
            handleTranslate={handleTranslate}
            hasResult={
              mode === "text" ? outputText?.trim() !== "" : !!translatedFile
            }
          />
        </div>
      </main>
    </div>
  );
}
