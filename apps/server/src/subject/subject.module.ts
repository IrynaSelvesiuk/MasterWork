import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { TeacherModule } from 'src/teacher/teacher.module';
import { SubjectService } from './subject.service';
import { Subjectcontroller } from './subject.controller';

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
