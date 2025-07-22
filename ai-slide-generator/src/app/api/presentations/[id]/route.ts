import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const presentation = await prisma.presentation.findUnique({
      where: { id },
      include: { 
        slides: { 
          orderBy: { order: 'asc' } }
      },
    });

    if (!presentation) {
      return NextResponse.json({ error: '❌ Not found' }, { status: 404 });
    }
    return NextResponse.json({ 
      presentation: {
        id: presentation.id,
        title: presentation.title,
        themeId: presentation.themeId,
        slides: presentation.slides,
        createdAt: presentation.createdAt,
        updatedAt: presentation.updatedAt,
      }
    }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: '❌ Server error' }, { status: 500 });
  }
}
