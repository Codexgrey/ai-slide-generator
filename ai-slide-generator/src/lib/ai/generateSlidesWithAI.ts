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

async function generateSlideStructure( topic: string, numSlides: number, theme: Theme): 
    Promise<Omit<SlideInput, 'notes' | 'imagePrompt'>[]> {
    const prompt = `
        You are an expert presentation assistant. Generate a JSON array of ${numSlides} slides on the topic: "${topic}".

        Each slide must follow this exact format:
        {
        "title": "Slide Title",
        "content": ["Bullet point 1", "Bullet point 2", "Bullet point 3"]
        }

        Use a "${theme}" style. Return ONLY the JSON array. No explanation or intro.
    `;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
    });

    const raw = response.choices?.[0]?.message?.content ?? '';
    try {
        return JSON.parse(raw || '[]');
    } catch {
        console.error('❌ Failed to parse initial slide JSON:', raw);
        throw new Error('Invalid JSON from slide generator');
    }
}

async function generateNotesForSlide(slide: { title: string; content: string[] }, hasImage: boolean):
    Promise<string> {
    const prompt = `
        Slide title: "${slide.title}"
        Bullet points:
        ${slide.content.map((pt, i) => `${i + 1}. ${pt}`).join('\n')}

        Write the speaker notes for this slide.
        ${
        hasImage
            ? 'Write a single paragraph that touches on the bullet points with at most 6 lines of text.'
            : 'For each bullet point, write at least 3 detailed sentences. Separate each explanation neatly.'
        }
        Return ONLY the notes content as plain text.
    `;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
    });

    return response.choices?.[0]?.message?.content ?? '';
}

export async function generateSlidesWithAI({
    topic,
    numSlides,
    numSlidesWithImages,
    theme = themePresets['default'],
}: GenerateSlidesInput): Promise<SlideInput[]> {
    // phase 1: get slide title + bullets
    const basicSlides = await generateSlideStructure(topic, numSlides, theme);

    // randomly pick which slides should include images
    const indices = new Set<number>();
    while (indices.size < Math.min(numSlidesWithImages, numSlides)) {
        indices.add(Math.floor(Math.random() * numSlides));
    }

    // phase 2: add notes + imagePrompt where needed
    const fullSlides = await Promise.all(
        basicSlides.map(async (slide, index) => {
        const hasImage = indices.has(index);
        const notes = await generateNotesForSlide(slide, hasImage);

            return {
                ...slide,
                notes,
                imagePrompt: hasImage
                ? `An image that fits the slide titled "${slide.title}"`
                : undefined,
            };
        })
    );

    return fullSlides;
}
