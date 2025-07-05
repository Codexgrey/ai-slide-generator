import Image from 'next/image';
import { Slide } from '@/types/slide';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateSlide } from '@/redux/slidesSlice';


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

  return (
    <div className="border rounded-xl shadow-lg p-6 bg-white dark:bg-zinc-900 min-h-[400px] space-y-4">
      {/* Title */}
      <input
        type="text"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        onBlur={handleSave}
        className="text-xl font-bold w-full p-2 bg-zinc-100 dark:bg-zinc-800 rounded focus:outline-none"
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
              className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 focus:outline-none"
            />
          </li>
        ))}
      </ul>

      {/* Image */}
      {slide.imageUrl && (
        <Image
          src={slide.imageUrl}
          alt="slide image"
          className="w-full h-40 object-cover rounded-md"
          width={800}
          height={400}
        />
      )}

      {/* Notes */}
      <textarea
        value={localNotes}
        onChange={(e) => setLocalNotes(e.target.value)}
        onBlur={handleSave}
        placeholder="Add speaker notes..."
        rows={4}
        className="w-full p-2 bg-gray-100 dark:bg-zinc-800 rounded text-sm"
      />
    </div>
  );
}
