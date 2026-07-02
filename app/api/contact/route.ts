import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { decryptValue } from '@/lib/crypto';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ inquiries });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
      await prisma.contactInquiry.delete({ where: { id } });
    } else {
      await prisma.contactInquiry.deleteMany();
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message, isTestMail } = body;

    // Read configured SMTP settings from database
    const config = await prisma.systemConfig.findUnique({
      where: { id: 'global' },
    });

    if (!isTestMail && name && email && message) {
      // Save contact inquiry in permanent enterprise database
      await prisma.contactInquiry.create({
        data: {
          name,
          email,
          company: company || '',
          service: service || 'Custom Web Architecture',
          budget: budget || '$15k - $50k',
          message,
        },
      });
    }

    if (!config || !config.smtpHost || !config.smtpUser || !config.smtpPassEncrypted) {
      if (isTestMail) {
        return NextResponse.json({ error: 'SMTP host, username, or password is not configured in AES-256 database storage.' }, { status: 400 });
      }
      // If unconfigured, simulate success cleanly for visitor inquiry
      return NextResponse.json({
        success: true,
        simulated: true,
        message: 'Inquiry saved to database! (Simulated mail dispatch: SMTP credentials not yet configured in Admin panel).',
      });
    }

    // Temporarily decrypt password in memory
    const plainPass = decryptValue(config.smtpPassEncrypted);
    if (!plainPass) {
      return NextResponse.json({ error: 'Failed to decrypt stored AES-256-GCM SMTP password.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort || 587,
      secure: config.smtpSecure || false,
      auth: {
        user: config.smtpUser,
        pass: plainPass,
      },
    });

    const recipient = config.smtpFrom || config.smtpUser || 'hello@abctechnologies.com';

    if (isTestMail) {
      const info = await transporter.sendMail({
        from: `ABC Technologies <${config.smtpUser}>`,
        to: recipient,
        subject: '🚀 [Test Mail] ABC Technologies Military-Grade SMTP Verification',
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 12px;">
            <h2 style="color: #38bdf8;">SMTP Verification Successful!</h2>
            <p>Your AES-256-GCM encrypted credentials successfully decrypted in memory and triggered this verification email.</p>
            <p>Host: <strong>${config.smtpHost}:${config.smtpPort}</strong></p>
          </div>
        `,
      });
      return NextResponse.json({ success: true, message: `Test email sent successfully to ${recipient} via ${config.smtpHost}.` });
    }

    // Send actual contact form email
    await transporter.sendMail({
      from: `ABC Website Portal <${config.smtpUser}>`,
      to: recipient,
      replyTo: email,
      subject: `New Project Inquiry: ${service} from ${name} (${company || 'Individual'})`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; background: #0f172a; color: #f1f5f9; border-radius: 12px; border: 1px solid #334155;">
          <h2 style="color: #60a5fa; margin-top: 0;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name} (<a href="mailto:${email}" style="color: #38bdf8;">${email}</a>)</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Service Requested:</strong> ${service}</p>
          <p><strong>Target Budget:</strong> ${budget}</p>
          <hr style="border-color: #334155; margin: 20px 0;" />
          <h4 style="color: #cbd5e1; margin-bottom: 8px;">Architecture Details & Message:</h4>
          <p style="background: #1e293b; padding: 16px; border-radius: 8px; font-family: monospace; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: `Email dispatched via encrypted SMTP server to ${recipient}.`,
    });
  } catch (error: any) {
    console.error('SMTP Mail trigger error:', error);

    // Record SMTP error in Telemetry log
    await prisma.errorLog.create({
      data: {
        message: `SMTP Delivery Failed: ${error.message || error}`,
        stack: error.stack || String(error),
        path: '/api/contact',
        severity: 'WARNING',
      },
    }).catch(() => {});

    // If test mail, return error directly
    const body = await request.clone().json().catch(() => ({}));
    if (body.isTestMail) {
      return NextResponse.json({ error: `SMTP Connection Failed: ${error.message}` }, { status: 500 });
    }

    // Fallback response for contact form so user isn't stuck
    return NextResponse.json({
      success: true,
      simulated: true,
      message: 'Inquiry saved to database! (Note: SMTP mail delivery encountered a network issue, but your inquiry was logged).',
    });
  }
}
