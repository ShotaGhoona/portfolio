import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactRequest {
  name: string;
  email: string;
  messageType: string;
  message: string;
  to: string;
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, messageType, message, to }: ContactRequest = await request.json();

    // Validation
    if (!name || !email || !message || !to) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Compose email content
    const htmlContent = `
      <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
        <div style="background: white; border: 1px solid #e5e7eb; padding: 20px;">
          <div style="background: #f3f4f6; padding: 10px; border-bottom: 1px solid #e5e7eb; margin-bottom: 20px;">
            <div style="font-size: 12px; color: #6b7280;">portfolio.contact_form</div>
          </div>
          
          <h2 style="color: #111827; margin-top: 0;">New Contact Form Submission</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Name:</strong> ${name}
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Email:</strong> ${email}
          </div>
          
          ${messageType ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Message Type:</strong> ${messageType}
          </div>
          ` : ''}
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Message:</strong>
            <div style="background: #f9fafb; padding: 15px; margin-top: 5px; border-left: 3px solid #10b981;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
            <div>Sent from: Portfolio Contact Form</div>
            <div>Time: ${new Date().toLocaleString()}</div>
            <div>Reply to: ${email}</div>
          </div>
        </div>
      </div>
    `;

    const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${messageType ? `Message Type: ${messageType}\n` : ''}
Message:
${message}

---
Sent from: Portfolio Contact Form
Time: ${new Date().toLocaleString()}
Reply to: ${email}
    `;

    // Send email
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: to,
      replyTo: email,
      subject: `[Portfolio] ${messageType ? `${messageType} - ` : ''}Message from ${name}`,
      text: textContent,
      html: htmlContent,
    });

    console.log('Email sent:', info.messageId);

    return NextResponse.json(
      { message: 'Email sent successfully', messageId: info.messageId },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}