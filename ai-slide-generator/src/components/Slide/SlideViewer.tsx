import Image from 'next/image';
import { Slide } from '@/types/slide';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { updateSlide } from '@/redux/slidesSlice';
import { RootState } from '@/redux/store';
import { themePresets } from '@/lib/slides/themePresets';

export default function SlideViewer({ slide }: { slide: Slide }) {
  const dispatch = useDispatch();

  const [localTitle, setLocalTitle] = useState(slide.title);
  const [localNotes, setLocalNotes] = useState(slide.notes || '');
  const [localContent, setLocalContent] = useState([...slide.content]);

  const notesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalTitle(slide.title);
    setLocalNotes(slide.notes || '');
    setLocalContent([...slide.content]);
  }, [slide]);

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

  const themeId = useSelector(
    (state: RootState) => state.slides.currentPresentation?.theme?.id || 'clean'
  );
  const theme = themePresets[themeId];

  const renderBulletNotes = () => {
    const notesChunks = localNotes.split(/\n\s*\n/);
    return (
      <div className="flex flex-col justify-evenly h-full text-sm leading-relaxed whitespace-pre-wrap px-2">
        {notesChunks.map((chunk, i) => (
          <div key={i}>{chunk.trim()}</div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="border rounded-xl shadow-lg p-6 flex flex-col justify-start space-y-4 overflow-hidden"
      style={{
        height: '560px',
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
      }}
    >
      {/* Title */}
      <input
        type="text"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        onBlur={handleSave}
        className="text-xl font-bold w-full p-2 bg-white/40 rounded focus:outline-none"
        style={{ color: theme.textColor }}
      />

      {/* Bullet Points */}
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
              className="w-full bg-transparent border-b border-white/70 focus:outline-none"
              style={{ color: theme.textColor }}
            />
          </li>
        ))}
      </ul>

      {/* Notes / Image Section */}
      <div className="flex-grow overflow-hidden">
        {slide.imageUrl ? (
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 h-full">
            <div className="md:w-1/2 w-full flex justify-center items-center h-full">
              <Image
                src={slide.imageUrl}
                alt="slide image"
                width={600}
                height={300}
                className="max-h-full w-auto object-contain rounded shadow"
              />
            </div>
            <div
              ref={notesRef}
              className="md:w-1/2 w-full text-sm leading-relaxed whitespace-pre-wrap px-2 flex justify-center items-center h-full"
              style={{ color: theme.textColor }}
            >
              {localNotes}
            </div>
          </div>
        ) : (
          <div className="h-full" style={{ color: theme.textColor }}>
            {renderBulletNotes()}
          </div>
        )}
      </div>
    </div>
  );
}

