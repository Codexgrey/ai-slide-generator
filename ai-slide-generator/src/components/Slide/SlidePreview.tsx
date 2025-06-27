// client rendering
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SlideRenderer from "./SlideRenderer";

export default function SlidePreview() {
    const slides = useSelector((state: RootState) => state.slides.slides);

    if (!slides.length) return null;

    return (
        <section className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Preview Slides
        </h3>

        {slides.map((slide) => (
            <SlideRenderer key={slide.id} slide={slide} />
        ))}
        </section>
    );
}
