import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { SubjectService } from './subject.service';
import { Subjectcontroller } from './subject.controller';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subject]),
    forwardRef(() => TeacherModule),
  ],
  providers: [SubjectService],
  controllers: [Subjectcontroller],
  exports: [SubjectService],
})
export class SubjectModule {}
