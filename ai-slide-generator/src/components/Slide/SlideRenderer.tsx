// client rendering
"use client";

import Image from "next/image";
import type { Slide } from "@/redux/slidesSlice";

interface Props {
    slide: Slide;
    index?: number;
}

export default function SlideRenderer({ slide, index }: Props) {
    return (
        <div className="p-4 rounded-xl border bg-white dark:bg-gray-800 border-gray-200 
            dark:border-gray-700 shadow-md flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    {index !== undefined ? `Slide ${index + 1}: ` : ""}{slide.title}
                </h2>
                <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1 mb-4">
                    {slide.content.map((point, idx) => (
                        <li key={idx}>{point}</li>
                    ))}
                </ul>
            </div>
            {slide.imageUrl && (
                <div className="mt-4">
                    <Image
                        src={slide.imageUrl}
                        alt="Slide visual"
                        width={800}
                        height={400}
                        className="w-full h-auto object-cover rounded"
                    />
                </div>
            )}
        </div>
    );
}
