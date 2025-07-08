"use client";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { generateSlides } from "@/redux/slidesSlice";
import { setError } from "@/redux/uiSlice";
import { themePresets } from "@/lib/slides/themePresets";
import Loading from "@/components/UI/Loading";

interface Props {
    input: string;
    slideCount: number;
    includeImages: boolean;
    style: string;
}

export default function GenerateButton({
    input,
    slideCount,
    includeImages,
    style,
}: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const isGenerating = useSelector((state: RootState) => state.slides.isGenerating);

    const handleClick = async () => {
        dispatch(setError(null));

        const selectedThemeId = style.toLowerCase();
        const selectedTheme = themePresets[selectedThemeId] ?? themePresets["default"];

        if (!selectedTheme) {
            dispatch(setError("Theme could not be resolved."));
            return;
        }

        try {
            await dispatch(
                generateSlides({
                topic: input,
                numSlides: slideCount,
                includeImages,
                theme: selectedTheme,
                })
            );

        } catch {
            dispatch(setError("Failed to generate slides."));
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={handleClick}
                disabled={isGenerating || input.trim() === ''}
                className="w-[200px] h-[44px] px-6 bg-blue-600 text-white text-sm font-semibold 
                rounded-md hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGenerating ? "Generating..." : "Generate Slides"}
            </button>

            {isGenerating && <Loading />}
        </div>
    );
}
