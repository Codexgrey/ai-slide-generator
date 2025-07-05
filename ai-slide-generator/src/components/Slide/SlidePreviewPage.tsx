// client-side rendering
'use client';

import { useEffect, useState } from 'react';
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
  const [showToast, setShowToast] = useState(false);

  // toast logic on load
  useEffect(() => {
    if (localStorage.getItem('showEditToast') === 'true') {
      setShowToast(true);
      localStorage.removeItem('showEditToast');
      setTimeout(() => setShowToast(false), 3000);
    }
  }, []);

  if (!slides.length) {
    return <p className="text-center mt-10">No slides to preview.</p>;
  }

  return (
    <div className="relative p-4 max-w-5xl mx-auto">
      {/* notification */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white text-black 
          px-6 py-2 rounded shadow-md z-50 text-sm font-medium">
          ✅ Select a slide to edit
        </div>
      )}

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

