import Image from 'next/image';
import { Slide } from '@/types/slide';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateSlide } from '@/redux/slidesSlice';
import { RootState } from '@/redux/store';
import { themePresets } from '@/lib/slides/themePresets';

export default function SlideViewer({ slide }: { slide: Slide }) {
  const dispatch = useDispatch();

  const [localTitle, setLocalTitle] = useState(slide.title);
  const [localNotes, setLocalNotes] = useState(slide.notes || '');
  const [localContent, setLocalContent] = useState([...slide.content]);

  const handleSave = () => {
    dispatch(
      updateSlide({
        index: slide.order - 1,
        slide: {
          title: localTitle,
          content: localContent,
          notes: localNotes,
        },
      })
    );
  };

  // get themepreset from Redux
  const themeId = useSelector(
    (state: RootState) => state.slides.currentPresentation?.theme?.id || 'clean'
  );
  const theme = themePresets[themeId];

  return (
    <div
      className="border rounded-xl shadow-lg p-6 min-h-[400px] space-y-4"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
      }}
    >
      {/* title */}
      <input
        type="text"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        onBlur={handleSave}
        className="text-xl font-bold w-full p-2 bg-white/20 rounded focus:outline-none"
        style={{ color: theme.textColor }}
      />

      {/* bullet points */}
      <ul className="list-disc pl-5 space-y-2">
        {localContent.map((point, i) => (
          <li key={i}>
            <input
              value={point}
              onChange={(e) => {
                const updated = [...localContent];
                updated[i] = e.target.value;
                setLocalContent(updated);
              }}
              onBlur={handleSave}
              className="w-full bg-transparent border-b border-white/50 focus:outline-none"
              style={{ color: theme.textColor }}
            />
          </li>
        ))}
      </ul>

      {/* image */}
      {slide.imageUrl && (
        <div className="w-full h-[400px] flex items-center justify-center overflow-hidden rounded-md">
          <Image
            src={slide.imageUrl}
            alt="slide image"
            width={600}
            height={300}
            className="max-h-full w-auto object-contain"
          />
        </div>
      )}

      {/* notes */}
      <textarea
        value={localNotes}
        onChange={(e) => setLocalNotes(e.target.value)}
        onBlur={handleSave}
        placeholder="Add speaker notes..."
        rows={4}
        className="w-full p-2 bg-white/20 rounded text-sm"
        style={{ color: theme.textColor }}
      />
    </div>
  );
}

