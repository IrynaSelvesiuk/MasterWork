import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../shared/mail/mail.module';
import { StudentModule } from '../student/student.module';
import { TeacherModule } from '../teacher/teacher.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    forwardRef(() => TeacherModule),
    forwardRef(() => StudentModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => MailModule),
  ],
  exports: [BookingService],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
