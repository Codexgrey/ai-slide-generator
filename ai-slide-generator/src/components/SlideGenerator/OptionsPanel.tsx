// client rendering
"use client";

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
    const handleSlideChange = (delta: number) => {
        const newCount = Math.max(1, Math.min(slideCount + delta, 20));
        setSlideCount(newCount);
        // stop image count if it exceeds new slide count
        if (numSlidesWithImages > newCount) {
            setNumSlidesWithImages(newCount);
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
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

            {/* number of slides with images */}
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
                        setNumSlidesWithImages(Math.min(slideCount, parseInt(e.target.value) || 0))
                    }
                    className="w-full h-[44px] px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
                />
            </div>

            {/* presentation style */}
            <div className="md:w-[30%] w-full">
                <label className="block text-center font-medium text-sm mb-1 text-gray-700">
                    Presentation Style
                </label>
                <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full h-[44px] px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
                >
                    <option value="simple">Simple</option>
                    <option value="professional">Professional</option>
                    <option value="technology">Technology</option>
                    <option value="education">Education</option>
                    <option value="creative">Creative</option>
                    <option value="medical">Medical</option>
                </select>
            </div>
        </div>
    );
}
