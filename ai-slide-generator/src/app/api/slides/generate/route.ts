import { generateSlidesWithAI } from '@/lib/ai/generateSlidesWithAI';
import { fetchImageFromPrompt } from '@/lib/images/fetchImageFromPrompt';
import { savePresentationToDB } from '@/lib/slides/saveSlides';
import type { SlideInput } from '@/lib/slides/saveSlides';
import { validateSlides } from '@/lib/slides/validateSlides';


export async function POST(req: Request) {
    const body = await req.json();
    const { topic, numSlides, numSlidesWithImages, theme } = body;

    if (!topic || !numSlides || !theme) {
        return new Response(JSON.stringify({ error: 'Missing input fields' }), { status: 400 });
    }

    // validate full theme object
    const isValidTheme =
        typeof theme === 'object' &&
        theme?.id &&
        theme?.backgroundColor &&
        theme?.textColor &&
        theme?.fontFamily;

    if (!isValidTheme) {
        return new Response(JSON.stringify({ error: 'Invalid theme selected' }), { status: 400 });
    }

    try {
        const aiSlides = await generateSlidesWithAI({
            topic,
            numSlides,
            numSlidesWithImages,
            theme,
        });

        interface AISlide {
            title: string;
            content: string[];
            imagePrompt?: string;
            notes?: string;
        }

        const processedSlides: SlideInput[] = await Promise.all(
            (aiSlides as AISlide[]).map(async (slide: AISlide): Promise<SlideInput> => {
                const imageUrl =
                    slide.imagePrompt ? await fetchImageFromPrompt(slide.title) ?? undefined : undefined;

                return {
                    title: slide.title,
                    content: slide.content,
                    imageUrl,
                    notes: slide.notes ?? '',
                };
            })
        );

        // validate the processed slides
        const validatedSlides = validateSlides(processedSlides);

        if (validatedSlides.length === 0) {
            return new Response(JSON.stringify({ error: 'Invalid slide data' }), { status: 400 });
        }

        const saved = await savePresentationToDB({
            title: topic,
            description: `Auto-generated on ${new Date().toLocaleDateString()}`,
            slides: validatedSlides,
            theme,
        });

        const serializedSlides = (saved.slides || []).map((slide) => ({
            ...slide,
            content: Array.isArray(slide.content)
                ? slide.content
                : typeof slide.content === 'string'
                ? JSON.parse(slide.content)
                : [],
        }));

        const presentationWithSerializedSlides = {
            ...saved,
            slides: serializedSlides,
        };

        return new Response(JSON.stringify({ presentation: presentationWithSerializedSlides }), {
            status: 200,
        });

    } catch (error) {
        console.error('❌ Slide generation + save error:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate and save slides' }), {
            status: 500,
        });
    }
}
