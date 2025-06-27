// opt-in for client-side rendering
"use client";

import { useState } from "react";
import InputForm from "@/components/SlideGenerator/InputForm";
import OptionsPanel from "@/components/SlideGenerator/OptionsPanel";
import GenerateButton from "@/components/SlideGenerator/GenerateButton";
import ThemeToggle from "@/components/Theme/ThemeToggle";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SlidePreview from "@/components/Slide/SlidePreview";
import Loading from "@/components/UI/Loading";


export default function CreatePage() {
  const loading = useSelector((state: RootState) => state.ui.loading);

  const [input, setInput] = useState("");
  const [slideCount, setSlideCount] = useState(5);
  const [includeImages, setIncludeImages] = useState(true);
  const [style, setStyle] = useState("professional");

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold">Create New Presentation</h1>
        <ThemeToggle />
      </header>

      <section className="max-w-4xl mx-auto p-4 space-y-6">
        <InputForm input={input} setInput={setInput} />
        <OptionsPanel
          slideCount={slideCount}
          setSlideCount={setSlideCount}
          includeImages={includeImages}
          setIncludeImages={setIncludeImages}
          style={style}
          setStyle={setStyle}
        />
        <div className="text-center">
          <GenerateButton
            loading={loading}
            input={input}
            slideCount={slideCount}
            includeImages={includeImages}
            style={style}
          />
          {loading ? <Loading /> : <SlidePreview />}
        </div>
      </section>
    </main>
  );
}