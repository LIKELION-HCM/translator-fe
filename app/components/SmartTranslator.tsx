"use client";

import { useState } from "react";
import ActionBar from "./ui/ActionBar";
import ApiKeyCard from "./ui/ApiKeyCard";
import FilePanel from "./ui/FilePanel";
import FileResultPanel from "./ui/FileResultPanel";
import Header from "./ui/Header";
import Hero from "./ui/Hero";
import LanguageBar from "./ui/LanguageBar";
import ModeTabs from "./ui/ModeTabs";
import TextPanel from "./ui/TextPanel";

export type Mode = "text" | "file";

export default function SmartTranslator() {
  const [mode, setMode] = useState<Mode>("text");

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [translatedFile, setTranslatedFile] = useState<File | null>(null);

  const [sourceLang, setSourceLang] = useState("detect");
  const [targetLang, setTargetLang] = useState("vietnamese");
  const [optimize, setOptimize] = useState("general");

  const canTranslate = mode === "text" ? inputText.trim() !== "" : !!file;

  const swapLanguage = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  return (
    <div className="bg-gradient-to-r from-[#DDEFFF] to-white min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto px-4 mt-10">
        <Hero />
        <ApiKeyCard />

        <div className="mt-8 bg-white rounded-2xl shadow p-5">
          <ModeTabs mode={mode} onChange={setMode} />

          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* INPUT */}
            <div>
              <LanguageBar
                variant="input"
                sourceLang={sourceLang}
                optimize={optimize}
                onSourceChange={setSourceLang}
                onOptimizeChange={setOptimize}
                onSwap={swapLanguage}
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
            </div>

            {/* OUTPUT */}
            <div>
              <LanguageBar
                variant="output"
                targetLang={targetLang}
                onTargetChange={setTargetLang}
              />

              {mode === "text" ? (
                <TextPanel
                  value={outputText}
                  readOnly
                  placeholder="Translation"
                />
              ) : (
                <FileResultPanel file={translatedFile} />
              )}
            </div>
          </div>

          <ActionBar
            mode={mode}
            disabled={!canTranslate}
            output={outputText}
            hasResult={
              mode === "text" ? outputText.trim() !== "" : !!translatedFile
            }
          />
        </div>
      </main>
    </div>
  );
}
