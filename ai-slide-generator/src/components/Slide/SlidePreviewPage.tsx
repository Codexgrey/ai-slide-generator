// client-side rendering
'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SlideViewer from './SlideViewer';
import SlideThumbnails from './SlideThumbnails';
import ExportPanel from './ExportPanel';
import Link from 'next/link';

export default function SlidePreviewPage() {
  const slides = useSelector((state: RootState) => state.slides.slides);
  const activeIndex = useSelector(
    (state: RootState) => state.slides.activeSlideIndex
  );
  const [showToast, setShowToast] = useState(false);

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
    <div className="relative p-4 max-w-7xl mx-auto">
      {/* onLoad notification */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white 
        text-black px-6 py-2 rounded shadow-md z-50 text-sm font-medium">
          ✅ Select a slide to edit
        </div>
      )}

      {/* back link */}
      <Link
        href="/create"
        className="inline-flex items-center text-gray-600 hover:text-black transition 
        hover:bg-gray-100 px-4 py-2 rounded-md shadow-sm border border-gray-200 mb-6"
      >
        ← Back to Create
      </Link>

      {/* actions panel */}
      <ExportPanel />

      {/* main layout */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6 items-start">
        {/* thumbnails sidebar */}
        <div className="w-full lg:w-1/5">
          <SlideThumbnails slides={slides} activeIndex={activeIndex} />
        </div>

        {/* SlideViewer */}
        <div className="flex-1">
          <SlideViewer slide={slides[activeIndex]} />
        </div>
      </div>
    </div>
  );
}

