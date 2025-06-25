// src/lib/slides/saveSlides.ts
import { prisma } from '@/lib/prisma'

export type SlideInput = {
  title: string
  content: string[]
  imageUrl?: string
  notes?: string
}

type SaveInput = {
  title: string
  description?: string
  slides: SlideInput[]
}

export async function savePresentationToDB(data: SaveInput) {
  try {
    console.log('🧪 Incoming data to save:', data)

    const presentation = await prisma.presentation.create({
      data: {
        title: data.title,
        description: data.description ?? '',
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
    })

    console.log('✅ Saved presentation:', presentation)
    return presentation
  } catch (error) {
    console.error('❌ Error in savePresentationToDB:', error)
    throw error
  }
}

