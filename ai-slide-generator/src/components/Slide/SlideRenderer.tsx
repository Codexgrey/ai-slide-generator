// client rendering
"use client";

import Image from "next/image";
import { Slide } from '@/types/slide';
import { Theme } from '@/types/theme';

interface Props {
    slide: Slide;
    index?: number;
    theme?: Theme;
}

export default function SlideRenderer({ slide, index, theme }: Props) {
    return (
        <div
            className="rounded-xl p-4 shadow-md transition-transform 
            duration-300 transform hover:-translate-y-2 hover:shadow-lg"

            style={{
                backgroundColor: theme?.backgroundColor || '#ffffff',
                border: `1px solid ${theme?.secondaryColor || '#ddd'}`,
                color: theme?.textColor || '#000000',
                fontFamily: theme?.fontFamily || 'Open Sans',
            }}
        >
            <h3 className="text-lg font-semibold mb-2">{slide.title}</h3>

            <ul className="list-disc pl-5 space-y-1">
                {slide.content.map((point, idx) => (
                <li key={idx}>{point}</li>
                ))}
            </ul>

            {slide.imageUrl && (
                <div className="mt-10 w-full h-[360px] overflow-hidden">
                    <Image
                        src={slide.imageUrl}
                        alt={`slide-${index}-image`}
                        width={600}
                        height={320}
                        className="rounded-md object-contain"
                    />
                </div>
            )}
        </div>
    );
}
