import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeacherService } from './services/teacher.service';
import { CreateTeacherInput } from './types/create-teacher-input';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async createTeacher(@Body() data: CreateTeacherInput) {
    return this.teacherService.createTeacher(data);
  }

  @Get()
  async getTeachers() {
    return this.teacherService.findAll();
  }
}
