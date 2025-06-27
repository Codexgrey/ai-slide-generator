export type ParsedSlide = {
    title: string;
    content: string[];
};

export function parseContentToSlides(
    rawText: string,
    numSlides: number = 5
): ParsedSlide[] {
    const slides: ParsedSlide[] = [];

    // clean up and split content into sentences
    const cleaned = rawText.replace(/\s+/g, ' ').trim();
    const sentences = cleaned.split(/(?<=[.?!])\s+/); // break by punctuation

    // distribute sentences evenly across slides
    const chunkSize = Math.ceil(sentences.length / numSlides);

    for (let i = 0; i < numSlides; i++) {
        const start = i * chunkSize;
        const end = start + chunkSize;
        const chunk = sentences.slice(start, end);

        if (chunk.length === 0) break;

        slides.push({
            title: `Slide ${i + 1}`,
            content: chunk,
        });
    }

    return slides;
}
