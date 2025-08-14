import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const tokenRecord = await prisma.passwordResetToken.findUnique({ where: { token } });

  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    return NextResponse.json({ message: 'Token is invalid or has expired' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: tokenRecord.userId },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  return NextResponse.json({ message: 'Password reset successful' });
}
