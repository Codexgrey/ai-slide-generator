// client-side rendering
'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SlideViewer from './SlideViewer';
import SlideThumbnails from './SlideThumbnails';
import ExportPanel from './ExportPanel';

export default function SlidePreviewPage() {
  const slides = useSelector((state: RootState) => state.slides.slides);
  const activeIndex = useSelector(
    (state: RootState) => state.slides.activeSlideIndex
  );

  if (!slides.length) {
    return <p className="text-center mt-10">No slides to preview.</p>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <ExportPanel />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex-1">
          <SlideViewer slide={slides[activeIndex]} />
        </div>
        <div className="w-full lg:w-1/4">
          <SlideThumbnails slides={slides} activeIndex={activeIndex} />
        </div>
      </div>
    </div>
  );
}
