
import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      requireTLS: true,
      auth: {
        user: 'phutran.jp1@gmail.com', // your SMTP username
        pass: 'nnznjlvtqksijdji', // your SMTP password
      },
    });
  }

  async sendConfirmationEmail(to: string, token: string) {
    // compose the email
    const info = await this.transporter.sendMail({
      from: '"No Reply" <no-reply@example.com>', // sender address
      to: to, // list of receivers
      subject: 'Please confirm your email', // Subject line
      text: `Please confirm your email by clicking on the following link: 
      ${token}`, // plain text body
    });

    console.log('Message sent: %s', info.messageId);
  }
}
