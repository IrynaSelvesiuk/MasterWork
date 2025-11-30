import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeacherService } from './services/teacher.service';
import { TeacherController } from './controllers/teacher.controller';
import { Education } from './entities/education.entity';
import { Experience } from './entities/experience.entity';
import { Review } from './entities/review.entity';
import { Availability } from './entities/availability.enitity';

import { ReviewService } from './services/review.service';
import { ReviewController } from './controllers/review.controller';
import { AuthModule } from '../auth/auth.module';
import { BookingModule } from '../bookings/booking.module';
import { StudentModule } from '../student/student.module';
import { SubjectModule } from '../subject/subject.module';
import { UserModule } from '../user/user.module';

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
    forwardRef(() => UserModule),
  ],
  exports: [TeacherService],
  controllers: [TeacherController, ReviewController],
  providers: [TeacherService, ReviewService],
})
export class TeacherModule {}
