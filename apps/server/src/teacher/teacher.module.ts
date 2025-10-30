import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeacherService } from './services/teacher.service';
import { TeacherController } from './teacher.controller';
import { SubjectModule } from 'src/subject/subject.module';
import { Education } from './entities/education.entity';
import { Experience } from './entities/experience.entity';
import { Review } from './entities/review.entity';
import { Availability } from './entities/availability.enitity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

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
  ],
  exports: [TeacherService],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
