import { generateSlidesWithAI } from '@/lib/ai/generateSlidesWithAI';
import { fetchImageFromPrompt } from '@/lib/images/fetchImageFromPrompt';
import { savePresentationToDB } from '@/lib/slides/saveSlides';
import type { SlideInput } from '@/lib/slides/saveSlides';

export async function POST(req: Request) {
    const body = await req.json();
    const { topic, numSlides, includeImages, theme } = body;

    if (!topic || !numSlides) {
        return new Response(JSON.stringify({ error: 'Missing input fields' }), { status: 400 });
    }

    try {
        const aiSlides = await generateSlidesWithAI({
            topic,
            numSlides,
            includeImages,
            theme,
        });

        interface AISlide {
            title: string;
            content: string[];
            imagePrompt?: string;
            notes?: string;
        }

        const processedSlides: SlideInput[] = await Promise.all(
            (aiSlides as AISlide[]).map(async (slide): Promise<SlideInput> => {
                const imageUrl =
                includeImages && slide.imagePrompt
                    ? await fetchImageFromPrompt(slide.imagePrompt) ?? undefined // ✅ null-safe
                    : undefined;

                return {
                title: slide.title,
                content: slide.content,
                imageUrl,
                notes: slide.notes ?? '',
                };
            })
        );


        const saved = await savePresentationToDB({
            title: topic,
            description: `Auto-generated on ${new Date().toLocaleDateString()}`,
            slides: processedSlides,
        });

        return new Response(JSON.stringify(saved), { status: 200 });
    } catch (error) {
        console.error('❌ Slide generation+save error:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate and save slides' }), {
        status: 500,
        });
    }
}
