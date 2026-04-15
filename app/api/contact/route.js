import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'sujalkoshtawork@gmail.com',
      reply_to: email,
      subject: 'New Portfolio Message',
      html: `
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
