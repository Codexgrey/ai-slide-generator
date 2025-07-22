// client rendering
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SlideRenderer from './SlideRenderer';
import { Slide } from '@/types/slide';
import Loading from '@/components/UI/Loading';

export default function SlidePreview() {
  const slides = useSelector((state: RootState) => state.slides.slides);
  const theme = useSelector((state: RootState) => state.slides.currentPresentation?.theme);
  const router = useRouter();

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  if (!slides.length) return null;

  const handleClick = (index: number) => {
    setLoadingIndex(index);
    localStorage.setItem('showEditToast', 'true');
    setTimeout(() => {
      router.push(`/preview?slide=${index}`);
    }, 300);
  };

  return (
    <section className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <h3 className="text-xl font-semibold text-gray-800 col-span-full text-left pl-1">
          Preview Slides
        </h3>

        {slides.map((slide: Slide, index: number) => (
          <div
            key={slide.id}
            className="relative cursor-pointer hover:opacity-90 transition"
            onClick={() => handleClick(index)}
          >
            {/* slide Card */}
            <SlideRenderer slide={slide} index={index} theme={theme} />

            {/* overlay on Clicked slide */}
            {loadingIndex === index && (
              <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-md">
                <Loading />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

