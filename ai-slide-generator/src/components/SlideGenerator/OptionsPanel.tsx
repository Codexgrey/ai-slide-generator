"use client";
import { useState } from "react";
import { themePresets } from "@/lib/slides/themePresets";

interface Props {
    slideCount: number;
    setSlideCount: (val: number) => void;
    numSlidesWithImages: number;
    setNumSlidesWithImages: (val: number) => void;
    style: string;
    setStyle: (val: string) => void;
}

export default function OptionsPanel({
    slideCount,
    setSlideCount,
    numSlidesWithImages,
    setNumSlidesWithImages,
    style,
    setStyle,
}: Props) {
    const [showDialog, setShowDialog] = useState(false);
    const handleSlideChange = (delta: number) => {
        const newCount = Math.max(1, Math.min(slideCount + delta, 20));
        setSlideCount(newCount);

        // stop image count if it exceeds new slide count
        if (numSlidesWithImages > newCount) {
        setNumSlidesWithImages(newCount);
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 relative">
            {/* slide count */}
            <div className="md:w-[30%] w-full">
                <label className="block text-center font-medium text-sm mb-1 text-gray-700">
                    Slide Count
                </label>
                <div className="flex border border-gray-300 rounded-md overflow-hidden h-[44px]">
                    <button
                        onClick={() => handleSlideChange(-1)}
                        className="w-1/4 px-2 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
                    >
                        -
                    </button>
                    <div className="w-1/2 flex items-center justify-center bg-white text-gray-900">
                        {slideCount}
                    </div>
                    <button
                        onClick={() => handleSlideChange(1)}
                        className="w-1/4 px-2 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* number of slides with images  */}
            <div className="md:w-[18%] w-full">
                <label className="block text-center font-medium text-sm mb-1 text-gray-700">
                    Slides with Images
                </label>
                <input
                    type="number"
                    min={0}
                    max={slideCount}
                    value={numSlidesWithImages}
                    onChange={(e) =>
                        setNumSlidesWithImages(
                        Math.min(slideCount, parseInt(e.target.value) || 0)
                        )
                    }
                    className="w-full h-[44px] px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
                />
            </div>

            {/* presentation theme selector */}
            <div className="md:w-[30%] w-full">
                <label className="block text-center font-medium text-sm mb-1 text-gray-700">
                    Presentation Theme
                </label>
                <button
                    onClick={() => setShowDialog(true)}
                    className="w-full h-[44px] px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 text-left"
                >
                    {style ? themePresets[style]?.name : "Select Theme"}
                </button>
            </div>

            {/* dialog box */}
            {showDialog && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setShowDialog(false)} />
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl max-w-3xl w-full shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                                Choose a Theme
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {Object.entries(themePresets).map(([key, theme]) => (
                                    <button
                                        key={key}
                                        onClick={() => {
                                            setStyle(theme.id);
                                            setShowDialog(false);
                                        }}
                                        style={{
                                            backgroundColor: theme.backgroundColor,
                                            color: theme.textColor,
                                            fontFamily: theme.fontFamily,
                                        }}
                                        className="rounded-md px-4 py-3 text-sm font-medium shadow-md 
                                        transition-transform duration-200 hover:scale-105"
                                    >
                                        {theme.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

