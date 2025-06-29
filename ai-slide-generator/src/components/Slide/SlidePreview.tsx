// client rendering
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SlideRenderer from "./SlideRenderer";

export default function SlidePreview() {
    const slides = useSelector((state: RootState) => state.slides.slides);
    const theme = useSelector((state: RootState) => state.slides.currentPresentation?.theme);

    if (!slides.length) return null;

    return (
        <section className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white col-span-full text-left pl-1">
                    Preview Slides
                </h3>
                {slides.map((slide, index) => (
                    <SlideRenderer key={slide.id} slide={slide} index={index} theme={theme} />
                ))}
            </div>
        </section>
    );
}
