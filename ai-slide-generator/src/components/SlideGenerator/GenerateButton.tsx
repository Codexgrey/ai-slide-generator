// client rendering
"use client";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { generateSlides } from "@/redux/slidesSlice";
import { setError, setLoading } from "@/redux/uiSlice";

interface Props {
    loading: boolean;
    input: string;
    slideCount: number;
    includeImages: boolean;
    style: string;
}

export default function GenerateButton({
    loading,
    input,
    slideCount,
    includeImages,
    style,
}: Props) {
    const dispatch = useDispatch<AppDispatch>();
    
    const handleClick = async () => {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));

            await dispatch(
                generateSlides({
                input,
                slideCount,
                includeImages,
                style,
                })
            );

        } catch {
            dispatch(setError("Failed to generate slides."));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <button
        onClick={handleClick}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? "Generating..." : "Generate Slides"}
        </button>
    );
}