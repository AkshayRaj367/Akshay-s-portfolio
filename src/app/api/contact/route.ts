import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email to you (notification)
    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'akshay.raj.p.367@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #000; color: #fff; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; color: #00ffff;">New Contact Form Submission</h1>
          </div>
          <div style="background-color: #fff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Contact Details</h2>
            <div style="margin-bottom: 15px;">
              <strong style="color: #666;">Name:</strong>
              <span style="color: #000; margin-left: 10px;">${name}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #666;">Email:</strong>
              <span style="color: #000; margin-left: 10px;">${email}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #666;">Subject:</strong>
              <span style="color: #000; margin-left: 10px;">${subject}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #666;">Message:</strong>
              <div style="color: #000; margin-top: 10px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #00ffff; border-radius: 4px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                This message was sent from your portfolio website contact form.
              </p>
            </div>
          </div>
        </div>
      `,
    }

    // Thank you email to the sender
    const senderMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me - P. Maria Bala Akshay Raj',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #000; color: #fff; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; color: #00ffff;">Thank You for Reaching Out!</h1>
          </div>
          <div style="background-color: #fff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Dear ${name},</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you so much for taking the time to contact me! I've received your message and I'm excited to read what you have to say.
            </p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-top: 0;">Your Message Summary:</h3>
              <div style="margin-bottom: 10px;">
                <strong style="color: #666;">Subject:</strong>
                <span style="color: #000; margin-left: 10px;">${subject}</span>
              </div>
              <div>
                <strong style="color: #666;">Message:</strong>
                <div style="color: #000; margin-top: 10px; padding: 15px; background-color: #fff; border-left: 4px solid #00ffff; border-radius: 4px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              I'll get back to you as soon as possible, typically within 24-48 hours. In the meantime, feel free to check out my portfolio and projects on my website.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://akshay-portfolio.vercel.app" style="display: inline-block; background-color: #00ffff; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Visit My Portfolio
              </a>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Best regards,<br>
                P. Maria Bala Akshay Raj<br>
                <a href="mailto:mariabala367@gmail.com" style="color: #00ffff;">mariabala367@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      `,
    }

    // Send both emails
    console.log('Sending owner email to: akshay.raj.p.367@gmail.com')
    const ownerResult = await transporter.sendMail(ownerMailOptions)
    console.log('Owner email sent:', ownerResult.messageId)
    
    console.log('Sending thank you email to:', email)
    const senderResult = await transporter.sendMail(senderMailOptions)
    console.log('Sender email sent:', senderResult.messageId)

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
