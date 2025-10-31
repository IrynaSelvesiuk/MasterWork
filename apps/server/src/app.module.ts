import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import configuration from './config/env.config';
import { validationSchema } from './config/validation.schema';
import { HashModule } from './shared/hash/hash.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { BookingModule } from './bookings/booking.module';
import { MailModule } from './shared/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [configuration],
    }),
    DatabaseModule,
    HashModule,
    MailModule,
    AuthModule,
    UserModule,
    TeacherModule,
    StudentModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
