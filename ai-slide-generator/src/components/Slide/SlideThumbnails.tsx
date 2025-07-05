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
          className={`border p-2 rounded-md cursor-pointer text-sm ${
            index === activeIndex ? 'border-blue-500' : 'border-gray-300'
          } bg-white dark:bg-zinc-800`}
        >
          <p className="font-semibold truncate">{slide.title}</p>
          <ul className="text-xs list-disc ml-4">
            {slide.content.slice(0, 2).map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
