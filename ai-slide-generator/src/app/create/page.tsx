// opt-in for client-side rendering
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import InputForm from '@/components/SlideGenerator/InputForm';
import OptionsPanel from '@/components/SlideGenerator/OptionsPanel';
import GenerateButton from '@/components/SlideGenerator/GenerateButton';
import ThemeToggle from '@/components/Theme/ThemeToggle';
import SlidePreview from '@/components/Slide/SlidePreview';

export default function CreatePage() {
  const [input, setInput] = useState('');
  const [slideCount, setSlideCount] = useState(5);
  const [includeImages, setIncludeImages] = useState(true);
  const [style, setStyle] = useState('professional');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const slides = useSelector((state: RootState) => state.slides.slides);

  const handlePreviewClick = async () => {
    setLoading(true);
    // mark in localStorage for notification after navigation
    localStorage.setItem('showEditToast', 'true');
    await router.push('/preview');
  };

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

        <div className="flex flex-col items-center gap-6 mt-8">
          <GenerateButton
            input={input}
            slideCount={slideCount}
            includeImages={includeImages}
            style={style}
          />

          {slides.length > 0 && (
            <button
              onClick={handlePreviewClick}
              disabled={loading}
              className={`w-[200px] h-[44px] px-6 py-2 text-sm font-semibold rounded transition-all ${
                loading
                  ? 'bg-zinc-400 text-white cursor-not-allowed'
                  : 'bg-zinc-600 text-white hover:bg-blue-500'
              }`}
            >
              {loading ? 'Creating Slides...' : 'View Slides'}
            </button>
          )}

          <SlidePreview />
        </div>
      </section>
    </main>
  );
}
