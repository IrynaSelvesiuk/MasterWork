import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeacherService } from './services/teacher.service';
import { TeacherController } from './controllers/teacher.controller';
import { SubjectModule } from 'src/subject/subject.module';
import { Education } from './entities/education.entity';
import { Experience } from './entities/experience.entity';
import { Review } from './entities/review.entity';
import { Availability } from './entities/availability.enitity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { BookingModule } from 'src/bookings/booking.module';
import { ReviewService } from './services/review.service';
import { ReviewController } from './controllers/review.controller';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Teacher,
      Education,
      Experience,
      Review,
      Availability,
    ]),
    forwardRef(() => SubjectModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => BookingModule),
    forwardRef(() => StudentModule),
  ],
  exports: [TeacherService],
  controllers: [TeacherController, ReviewController],
  providers: [TeacherService, ReviewService],
})
export class TeacherModule {}
