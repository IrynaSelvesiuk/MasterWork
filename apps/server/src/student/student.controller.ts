import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RequestWithUser } from '../shared/types/request-with-user';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: RequestWithUser) {
    const userId = req.user.id;

    return this.studentService.findOneByUserId(userId);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@Body() data: UpdateStudentDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    console.log(data);
    const student = await this.studentService.findOneByUserId(userId);

    return this.studentService.updateStudent(student.id, data);
  }
}
