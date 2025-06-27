import type { SlideInput } from '@/lib/slides/saveSlides';

export function validateSlides(slides: SlideInput[]): SlideInput[] {
    // console.log('🧪 VALIDATING — checking slides...');
    const allValid = slides.every(slide =>
        typeof slide.title === 'string' &&
        slide.title.trim().length > 0 &&
        Array.isArray(slide.content) &&
        slide.content.length > 0 &&
        slide.content.every(bullet => typeof bullet === 'string' && bullet.trim().length > 0)
    );

    if (!allValid) {
        // console.error('❌ [Validation Error] One or more slides are invalid');
        return [];
    }

    return slides.map((slide, index) => ({
        title: slide.title.trim(),
        content: slide.content.map(bullet => bullet.trim()),
        imageUrl: slide.imageUrl?.trim() || undefined,
        notes: slide.notes?.trim() || '',
        order: index,
    }));
}
