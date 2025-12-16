import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    const options: SMTPTransport.Options = {
      host: process.env.MAIL_HOST!,
      port: Number(process.env.MAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!,
      },
    };

    this.transporter = nodemailer.createTransport(options);
  }

  async sendBookingStatusEmail(
    to: string,
    status: string,
    teacherName: string,
    date: Date,
    meetingLink: string,
  ) {
    const subject =
      status === 'confirmed' ? 'Ваш урок підтверджено!' : 'Ваш урок відхилено';

    const html = `
      <h3>${subject}</h3>
      <p>Викладач: <b>${teacherName}</b></p>
      <p>Дата уроку: ${new Date(date).toLocaleString('uk-UA')}</p>
      <p>Статус: <b>${status}</b></p>
      ${meetingLink}}
    `;

    try {
      const info: SMTPTransport.SentMessageInfo =
        await this.transporter.sendMail({
          from: `"MySchool" <${process.env.MAIL_USER!}>`,
          to,
          subject,
          html,
        });

      this.logger.log(`Email sent: ${info.messageId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.error('Failed to send email', err.stack);
      } else {
        this.logger.error('Failed to send email', String(err));
      }
    }
  }
}
