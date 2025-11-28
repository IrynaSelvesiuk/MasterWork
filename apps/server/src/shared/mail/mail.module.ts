import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { GoogleCalendarService } from './google-calendar.service';

@Module({
  imports: [],
  providers: [MailService, GoogleCalendarService],
  exports: [MailService, GoogleCalendarService],
})
export class MailModule {}
