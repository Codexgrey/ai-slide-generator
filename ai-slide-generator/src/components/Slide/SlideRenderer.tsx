"use client";
import Image from "next/image";
import type { Slide } from "@/redux/slidesSlice";

interface Props {
    slide: Slide;
}

export default function SlideRenderer({ slide }: Props) {
    return (
        <div className="w-full p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {slide.title}
            </h2>

            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1 mb-4">
                {slide.content.map((point, idx) => (
                <li key={idx}>{point}</li>
                ))}
            </ul>

            {slide.imageUrl && (
                <Image
                src={slide.imageUrl}
                alt="Slide visual"
                width={800}
                height={400}
                className="w-full max-h-60 object-cover rounded"
                />
            )}
        </div>
    );
}
