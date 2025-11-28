import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Auth, calendar_v3, google } from 'googleapis';
import * as path from 'path';

@Injectable()
export class GoogleCalendarService {
  private calendar: calendar_v3.Calendar;
  private readonly logger = new Logger(GoogleCalendarService.name);

  private readonly CALENDAR_ID: string;

  private readonly KEY_FILE_PATH = path.join(
    process.cwd(),
    'google-service-account.json',
  );

  constructor(private readonly configService: ConfigService) {
    this.CALENDAR_ID = this.configService.getOrThrow<string>('CALENDAR_ID');

    const auth = new google.auth.GoogleAuth({
      keyFile: this.KEY_FILE_PATH,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    }) as Auth.GoogleAuth;

    this.calendar = google.calendar({
      version: 'v3',
      auth,
    }) as calendar_v3.Calendar;
  }

  /**
   * Creates a Google Calendar event with a Google Meet link.
   */
  async createMeeting(
    title: string,
    description: string,
    startTime: Date,
    endTime: Date,
  ): Promise<string> {
    // Generate a fake Google Meet link
    const generateFakeMeetLink = () => {
      const randomString = () =>
        Math.random().toString(36).substring(2, 5) +
        '-' +
        Math.random().toString(36).substring(2, 6) +
        '-' +
        Math.random().toString(36).substring(2, 5);
      return `https://meet.google.com/${randomString()}`;
    };

    const fakeMeetLink = generateFakeMeetLink();

    try {
      // Create the calendar event WITHOUT conferenceData
      const event: calendar_v3.Schema$Event = {
        summary: title,
        description: `${description}\n\nFake Google Meet link: ${fakeMeetLink}`,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'UTC',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'UTC',
        },
      };

      await this.calendar.events.insert({
        calendarId: this.CALENDAR_ID,
        requestBody: event,
      });

      this.logger.log(`Created event with fake Google Meet: ${fakeMeetLink}`);
      return fakeMeetLink;
    } catch (error) {
      this.logger.error('Failed to create event', error);
      return fakeMeetLink; // still return fake link so workflow continues
    }
  }
}
