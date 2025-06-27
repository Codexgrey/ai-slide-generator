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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Slide Count */}
        <div>
            <label className="block font-medium mb-1">Number of Slides</label>
            <div className="flex items-center gap-2">
            <button
                onClick={() => handleSlideChange(-1)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
                -
            </button>
            <span className="text-lg font-semibold">{slideCount}</span>
            <button
                onClick={() => handleSlideChange(1)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
                +
            </button>
            </div>
        </div>

        {/* Image Toggle */}
        <div>
            <label className="block font-medium mb-1">Include Images</label>
            <div className="flex gap-4 items-center">
            <label className="flex items-center gap-1">
                <input
                type="radio"
                name="images"
                checked={includeImages}
                onChange={() => setIncludeImages(true)}
                />
                Yes
            </label>
            <label className="flex items-center gap-1">
                <input
                type="radio"
                name="images"
                checked={!includeImages}
                onChange={() => setIncludeImages(false)}
                />
                No
            </label>
            </div>
        </div>

        {/* Theme Selector */}
        <div>
            <label className="block font-medium mb-1">Presentation Style</label>
            <select
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            >
            <option value="professional">Professional</option>
            <option value="tech">Tech</option>
            <option value="education">Education</option>
            <option value="creative">Creative</option>
            <option value="business">Business</option>
            </select>
        </div>
        </div>
    );
}
