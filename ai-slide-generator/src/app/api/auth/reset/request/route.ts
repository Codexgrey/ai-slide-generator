import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendResetPasswordEmail } from '@/lib/email';
import { v4 as uuidv4 } from 'uuid';
import { addHours } from 'date-fns';

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ message: 'If the email is valid, a reset link will be sent.' });

  const token = uuidv4();
  const tokenExpiry = addHours(new Date(), 1); // token valid for 1 hour

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: tokenExpiry,
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await sendResetPasswordEmail(email, resetLink);

  return NextResponse.json({ message: 'Reset email sent.' });
}
