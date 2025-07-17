// client-side rendering
'use client';

import { Slide } from '@/types/slide';
import { useDispatch } from 'react-redux';
import { setActiveSlideIndex } from '@/redux/slidesSlice';

export default function SlideThumbnails({
  slides,
  activeIndex,
}: {
  slides: Slide[];
  activeIndex: number;
}) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row lg:flex-col gap-4 overflow-auto max-h-[400px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          onClick={() => dispatch(setActiveSlideIndex(index))}
          className={`relative border p-3 rounded-md cursor-pointer text-sm transition ${
            index === activeIndex
              ? 'border-zinc-800 bg-zinc-50'
              : 'border-gray-300 bg-white hover:border-zinc-200'
          }`}
        >
          {/* Fully visible top-left badge */}
          <div
            className="absolute top-1 left-1 w-6 h-6 rounded-full bg-blue-600 text-white text-xs 
            font-semibold flex items-center justify-center shadow-sm"
          >
            {index + 1}
          </div>

          <p className="font-medium truncate mt-1 ml-7">{slide.title}</p>
          <ul className="text-xs list-disc ml-7 mt-1 text-gray-600">
            {slide.content.slice(0, 2).map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
