import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactFormEmail from '../../../components/emails/ContactFormEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email, reason, message } = await req.json();

    if (!email || !reason || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>', 
      to: 'sujalkoshtawork@gmail.com',
      subject: `New Portfolio Message: ${reason}`,
      reply_to: email,

      // ✅ FIXED: use JSX, not a function call
      react: <ContactFormEmail senderEmail={email} reason={reason} message={message} />,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!', data }, { status: 200 });

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}

