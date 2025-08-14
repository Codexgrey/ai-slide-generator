// email sending utility
import { Resend } from 'resend';

export async function sendResetPasswordEmail(email: string, resetLink: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  // console.log(`[RESEND] Triggered email for: ${email}`);
  // console.log(`[RESEND] ENV Key exists?`, Boolean(process.env.RESEND_API_KEY));
  // console.log(`[RESEND] Raw key (first 5):`, process.env.RESEND_API_KEY?.slice(0, 5));
  // console.log(`[RESEND INIT] Preparing email to ${email}`);
  // console.log('[RESEND] API key exists:', !!process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Professor Dux <onboarding@resend.dev>', // change to Professor Dux domain email
      to: 'thecodexgrey@gmail.com', // change to - email ,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password (valid for 1 hour):</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    console.log('[RESEND] API response:', { data, error });

    if (error) {
      console.error('[RESEND ERROR]', error);
    } else {
      console.log(`[RESEND] Email sent to ${email} | ID: ${data?.id}`);
    }
  } catch (err) {
    console.error('[RESEND EXCEPTION]', err);
  }
}

