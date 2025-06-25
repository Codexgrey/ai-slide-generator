import type { SlideInput } from '@/lib/slides/saveSlides';

export function validateSlides(slides: SlideInput[]): SlideInput[] {
  return slides
    .filter(slide => !!slide.title?.trim() && Array.isArray(slide.content) && slide.content.length > 0)
    .map((slide, index) => ({
      title: slide.title.trim(),
      content: slide.content
        .map(bullet => bullet.trim())
        .filter(bullet => bullet.length > 0),
      imageUrl: slide.imageUrl?.trim() || undefined,
      notes: slide.notes?.trim() || '',
      order: index,
    }));
}
