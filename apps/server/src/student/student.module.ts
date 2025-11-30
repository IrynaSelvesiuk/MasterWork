import { forwardRef, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentController } from './student.controller';
import { AuthModule } from '../auth/auth.module';
import { BookingModule } from '../bookings/booking.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => BookingModule),
  ],
  providers: [StudentService],
  exports: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
