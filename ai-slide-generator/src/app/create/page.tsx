// opt-in for client-side rendering
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import InputForm from '@/components/SlideGenerator/InputForm';
import OptionsPanel from '@/components/SlideGenerator/OptionsPanel';
import GenerateButton from '@/components/SlideGenerator/GenerateButton';
import PreviewSlides from '@/components/Slide/PreviewSlides';

export default function CreatePage() {
  const [input, setInput] = useState('');
  const [slideCount, setSlideCount] = useState(5);
  const [numSlidesWithImages, setNumSlidesWithImages] = useState(0); // updated state for image count
  const [style, setStyle] = useState('professional');
  const [loading, setLoading] = useState(false);
  const [showInputToast, setShowInputToast] = useState(false);

  const router = useRouter();
  const slides = useSelector((state: RootState) => state.slides.slides);

  const handlePreviewClick = async () => {
    setLoading(true);
    localStorage.setItem('previousInput', input);
    localStorage.setItem('showEditToast', 'true');
    await router.push('/preview');
  };

  // restore saved input when returning
  useEffect(() => {
    const restored = localStorage.getItem('previousInput');
    if (restored) setInput(restored);

    if (localStorage.getItem('showInputToast') === 'true') {
      setShowInputToast(true);
      localStorage.removeItem('showInputToast');
      setTimeout(() => setShowInputToast(false), 3000);
    }
  }, []);

  return (
    <>
      {showInputToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white 
        text-black px-6 py-2 rounded shadow-md z-50 text-sm font-medium">
          ✅ Your previous input has been restored
        </div>
      )}

      <main className="min-h-screen bg-white text-gray-900 ">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 ">
          <h1 className="text-2xl font-bold">Create New Presentation</h1>
        </header>

        <section className="max-w-4xl mx-auto p-4 space-y-6">
          <InputForm input={input} setInput={setInput} />
          <OptionsPanel
            slideCount={slideCount}
            setSlideCount={setSlideCount}
            numSlidesWithImages={numSlidesWithImages}
            setNumSlidesWithImages={setNumSlidesWithImages}
            style={style}
            setStyle={setStyle}
          />

          <div className="flex flex-col items-center gap-6 mt-8">
            <GenerateButton
              input={input}
              slideCount={slideCount}
              numSlidesWithImages={numSlidesWithImages}
              style={style}
            />

            {slides.length > 0 && (
              <button
                onClick={handlePreviewClick}
                disabled={loading}
                className={`w-[200px] h-[44px] px-6 py-2 text-sm font-semibold rounded transition-all ${
                  loading
                    ? 'bg-zinc-400 text-white cursor-not-allowed'
                    : 'bg-zinc-800 text-white hover:bg-zinc-600'
                }`}
              >
                {loading ? 'Creating Slides...' : 'View Slides'}
              </button>
            )}

            <PreviewSlides />
          </div>
        </section>
      </main>
    </>
  );
}
