import openai from './openaiClient';
import type { SlideInput } from '@/lib/slides/saveSlides';
import { Theme } from '@/types/theme';
import { themePresets } from '@/lib/slides/themePresets';


interface GenerateSlidesInput {
    topic: string;
    numSlides: number;
    includeImages?: boolean;
    theme?: Theme;
}

export async function generateSlidesWithAI({
    topic,
    numSlides,
    includeImages = false,
    theme = themePresets['default'],

}: GenerateSlidesInput): Promise<SlideInput[]> {
    const prompt = `
        You are an expert presentation assistant. Generate a ${numSlides}-slide presentation on the topic: "${topic}".

        Each slide should follow this exact JSON format:
        {
            "title": "Slide Title",
            "content": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
            "notes": "Speaker notes or elaboration that explain the bullet points in more detail"
            ${includeImages ? ',\n  "imagePrompt": "A short prompt describing a relevant image"' : ''}
        }

        ${includeImages
            ? 'Every slide must include an "imagePrompt" field describing an image suitable for the content.'
            : 'Do NOT include the "imagePrompt" field in any slide.'
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
        const slides = JSON.parse(raw || '[]');
        return slides;
    } catch {
        console.error('❌ Failed to parse AI response:', raw);
        throw new Error('Invalid JSON from AI response');
    }
}
