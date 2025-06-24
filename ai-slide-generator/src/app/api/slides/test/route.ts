// src/app/api/slides/test/route.ts

import { NextResponse } from 'next/server';
import { savePresentationToDB } from '@/lib/slides/saveSlides';

export async function POST() {
  console.log('📥 Received POST request at /api/slides/test');

  try {
    const saved = await savePresentationToDB({
      title: 'AI in Education',
      description: 'A demo for MVP testing',
      slides: [
        {
          title: 'Introduction',
          content: ['What is AI?', 'Why it matters'],
        },
        {
          title: 'Use Cases',
          content: ['Smart tutors', 'Adaptive content', 'Automated grading'],
          imageUrl: 'https://source.unsplash.com/random/800x600',
        },
      ],
    });

    console.log('✅ Saved to DB:', saved);

    return NextResponse.json(saved);
  } catch (error) {
    console.error('❌ Error saving slide:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
