import { Controller, Get } from '@nestjs/common';
import { TeacherService } from './services/teacher.service';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async getTeachers() {
    return this.teacherService.findAll();
  }
}
