import openai from './openaiClient';
import type { SlideInput } from '@/lib/slides/saveSlides';
import { Theme } from '@/types/theme';
import { themePresets } from '@/lib/slides/themePresets';

interface GenerateSlidesInput {
    topic: string;
    numSlides: number;
    numSlidesWithImages: number;
    theme?: Theme;
}

export async function generateSlidesWithAI({
    topic,
    numSlides,
    numSlidesWithImages,
    theme = themePresets['default'],

}: GenerateSlidesInput): Promise<SlideInput[]> {
    const prompt = `
        You are an expert presentation assistant. Generate a ${numSlides}-slide presentation on the topic: "${topic}".

        Each slide should follow this exact JSON format:
        {
            "title": "Slide Title",
            "content": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
            "notes": "Speaker notes or elaboration that explain each bullet point in detail with at least 3 sentences",
        }

        Use a "${theme}" style. Keep the language clear, structured, and professional.
        Return ONLY a JSON array of slides. No explanation or intro.
    `;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
    });

    const raw = response.choices?.[0]?.message?.content ?? '';

    try {
        const slides: SlideInput[] = JSON.parse(raw || '[]');

        // randomly assign image prompts to selected slides
        const indices = new Set<number>();
        while (indices.size < Math.min(numSlidesWithImages, slides.length)) {
        indices.add(Math.floor(Math.random() * slides.length));
        }

        return slides.map((slide, index) =>
        indices.has(index)
            ? {
                ...slide,
                imagePrompt: `An image that fits the slide titled "${slide.title}"`,
            }
            : slide
        );
    } catch {
        console.error('❌ Failed to parse AI response:', raw);
        throw new Error('Invalid JSON from AI response');
    }
}
