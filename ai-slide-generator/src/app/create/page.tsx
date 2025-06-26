// opt-in for client-side rendering
"use client";

import InputForm from "@/components/SlideGenerator/InputForm";
import OptionsPanel from "@/components/SlideGenerator/OptionsPanel";
import GenerateButton from "@/components/SlideGenerator/GenerateButton";
import ThemeToggle from "@/components/Theme/ThemeToggle";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function CreatePage() {
  const loading = useSelector((state: RootState) => state.ui.loading);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold">Create New Presentation</h1>
        <ThemeToggle />
      </header>

      <section className="max-w-4xl mx-auto p-4 space-y-6">
        <InputForm />
        <OptionsPanel />
        <div className="text-center">
          <GenerateButton loading={loading} />
        </div>
      </section>
    </main>
  );
}