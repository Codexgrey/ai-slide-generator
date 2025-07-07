// client rendering
"use client";

interface Props {
    slideCount: number;
    setSlideCount: (val: number) => void;
    includeImages: boolean;
    setIncludeImages: (val: boolean) => void;
    style: string;
    setStyle: (val: string) => void;
}

export default function OptionsPanel({
    slideCount,
    setSlideCount,
    includeImages,
    setIncludeImages,
    style,
    setStyle,

}: Props) {
    const handleSlideChange = (delta: number) => {
        setSlideCount(Math.max(1, Math.min(slideCount + delta, 20)));
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

            {/* include images */}
            <div className="md:w-[18%] w-full">
                <label className="block text-center font-medium text-sm mb-1 text-gray-700">
                    Include Images
                </label>
                <select
                    value={includeImages ? "yes" : "no"}
                    onChange={(e) => setIncludeImages(e.target.value === "yes")}
                    className="w-full h-[44px] px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
                >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
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
                    <option value="clean">Clean and Simple</option>
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
