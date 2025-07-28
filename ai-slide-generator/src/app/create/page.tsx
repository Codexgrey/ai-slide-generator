// opt-in for client-side rendering
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import InputForm from '@/components/SlideGenerator/InputForm';
import OptionsPanel from '@/components/SlideGenerator/OptionsPanel';
import GenerateButton from '@/components/SlideGenerator/GenerateButton';
import PreviewSlides from '@/components/Slide/PreviewSlides';

export default function CreatePage() {
  const [input, setInput] = useState('');
  const [slideCount, setSlideCount] = useState(5);
  const [numSlidesWithImages, setNumSlidesWithImages] = useState(0);
  const [style, setStyle] = useState('simple');
  const [loading, setLoading] = useState(false);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showInputToast, setShowInputToast] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const slides = useSelector((state: RootState) => state.slides.slides);
  const isReturning = searchParams.get('returning') === 'true';

  const handlePreviewClick = async () => {
    setLoading(true);
    localStorage.setItem('previousInput', input);
    localStorage.setItem('previousStyle', style);
    localStorage.setItem('showInputToast', 'true');
    await router.push('/preview');
  };


  useEffect(() => {
    if (isReturning) {
      const restored = localStorage.getItem('previousInput');
      const savedStyle = localStorage.getItem('previousStyle');
      if (restored) setInput(restored);
      if (savedStyle) setStyle(savedStyle);

      if (localStorage.getItem('showInputToast') === 'true') {
        setShowInputToast(true);
        localStorage.removeItem('showInputToast');
        setTimeout(() => setShowInputToast(false), 3000);
      }
    } else {
      // if not returning - clean up state
      localStorage.removeItem('previousInput');
      localStorage.removeItem('previousStyle');
      localStorage.removeItem('showInputToast');
      setInput('');
      setStyle('simple');
    }
  }, [isReturning]);

  useEffect(() => {
    localStorage.setItem('currentStyle', style);
  }, [style]);


  return (
    <>
      {showInputToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white 
        text-black px-6 py-2 rounded shadow-md z-50 text-sm font-medium">
          ✅ Your previous input has been restored
        </div>
      )}

      <main className="min-h-screen bg-white text-gray-900">
        <header className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {/* Buttons group */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setLoadingDashboard(true);
                  router.push('/dashboard')}
                } 
                disabled={loadingDashboard}
                className="inline-flex items-center text-gray-600 hover:text-black transition 
                hover:bg-gray-200 px-4 py-2 rounded-md shadow-sm border border-gray-300
                disabled:cursor-not-allowed disabled:opacity-50"
              >
                { loadingDashboard ? 'Loading...' : 'Dashboard'}
              </button>

              <button
                onClick={() => {
                  setLoadingHistory(true);
                  router.push('/history')}
                }
                disabled={loadingHistory}
                className="inline-flex items-center text-gray-600 hover:text-black transition 
                hover:bg-gray-200 px-4 py-2 rounded-md shadow-sm border border-gray-300
                disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingHistory  ? 'Loading...' : 'History' }
              </button>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-2xl font-bold">Create New Presentation</h1>
            </div>
          </div>
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
                className={`w-[200px] h-[44px] px-6 py-2 text-sm font-semibold rounded-md transition-all ${
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

