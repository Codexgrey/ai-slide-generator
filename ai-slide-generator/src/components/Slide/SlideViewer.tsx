import Image from 'next/image';
import { Slide } from '@/types/slide';

export default function SlideViewer({ slide }: { slide: Slide }) {
  return (
    <div className="border rounded-xl shadow-lg p-6 bg-white dark:bg-zinc-900 min-h-[400px]">
      <h2 className="text-xl font-bold mb-4">{slide.title}</h2>
      <ul className="list-disc pl-5 space-y-2">
        {slide.content.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
      {slide.imageUrl && (
        <Image
          src={slide.imageUrl}
          alt="slide image"
          className="mt-4 w-full h-40 object-cover rounded-md"
          width={800}
          height={400}
        />
      )}
      {slide.notes && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-zinc-800 rounded-md text-sm">
          <strong>Notes:</strong> {slide.notes}
        </div>
      )}
    </div>
  );
}
