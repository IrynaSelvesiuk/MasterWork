import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { RequestWithUser } from 'src/shared/types/request-with-user';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: RequestWithUser) {
    const userId = req.user.id;

    return this.studentService.findOneByUserId(userId);
  }
}
