import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        presentations: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    return new Response(JSON.stringify(user.presentations), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Error fetching presentations:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
