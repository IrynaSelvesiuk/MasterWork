import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { TeacherModule } from 'src/teacher/teacher.module';
import { StudentModule } from 'src/student/student.module';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/shared/mail/mail.module';

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
