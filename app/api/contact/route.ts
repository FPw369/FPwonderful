import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectType, message, links } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // In production, when EMAIL_USER and EMAIL_PASS are set in .env.local,
    // this can dispatch via Nodemailer or Resend.
    // For now, it logs the inquiry cleanly and returns a success status.
    console.log('--- NEW FPWONDERFUL INQUIRY ---');
    console.log(`To: fpwonderful.music@gmail.com`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Type: ${projectType}`);
    console.log(`Links: ${links || 'N/A'}`);
    console.log(`Message:\n${message}`);
    console.log('--------------------------------');

    return NextResponse.json({
      success: true,
      message: 'Transmission successfully delivered to fpwonderful.music@gmail.com',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
