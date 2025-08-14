import { prisma } from '@/lib/prisma';
import { Theme } from '@/types/theme';

export type SlideInput = {
    title: string;
    content: string[];
    imageUrl?: string;
    notes?: string;
};

type SaveInput = {
    title: string;
    description?: string;
    slides: SlideInput[];
    theme: Theme;
    userId: string;
};

export async function savePresentationToDB(data: SaveInput) {
    try {
        console.log('🧪 Incoming data to save:', data);

        const presentation = await prisma.presentation.create({
            data: {
              userId: data.userId,  
              title: data.title,
              description: data.description ?? '',
              themeId: data.theme.id,
              slides: {
                create: data.slides.map((slide, index) => ({
                  ...slide,
                  order: index,
                })),
              },
            },
            include: {
              slides: true,
            },
        });

        // manually attach theme to the returned object
        const presentationWithTheme = {
          ...presentation,
          theme: data.theme,
        };

        console.log('✅ Saved presentation with theme:', presentationWithTheme);
        return presentationWithTheme;

    } catch (error) {
          console.error('❌ Error in savePresentationToDB:', error);
      throw error;
    }
}
