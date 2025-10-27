import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeacherService } from './services/teacher.service';
import { TeacherController } from './teacher.controller';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    forwardRef(() => SubjectModule),
  ],
  exports: [TeacherService],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
