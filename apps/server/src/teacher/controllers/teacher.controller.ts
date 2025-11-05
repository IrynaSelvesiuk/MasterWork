import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from '../services/teacher.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { RequestWithUser } from 'src/shared/types/request-with-user';
import { UserService } from 'src/user/user.service';
import { UpdateTeacherProfileDto } from '../dto/update-teacher-profile.dto';
import { GetTeachersQueryDto } from '../dto/get-teachers-query.dto';

@Controller('teachers')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly userService: UserService,
  ) {}

  @Get('profile/me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() req: RequestWithUser) {
    const user = await this.userService.findOneBy('id', req.user.id);
    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }
    return this.teacherService.findProfileByUserId(user.id);
  }

  @Get('profile/:id')
  async getProfileById(@Param('id') id: string) {
    return this.teacherService.findById(id);
  }

  @Patch('profile/me')
  @UseGuards(JwtAuthGuard)
  async updateMyProfile(
    @Req() req: RequestWithUser,
    @Body() updateDto: UpdateTeacherProfileDto,
  ) {
    const user = await this.userService.findOneBy('id', req.user.id);
    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }
    const teacher = await this.teacherService.findProfileByUserId(user.id);

    if (!teacher) {
      throw new NotFoundException('Профіль вчителя не знайдено');
    }

    return this.teacherService.updateProfile(teacher.id, updateDto);
  }

  @Get()
  async getTeachers(@Query() query: GetTeachersQueryDto) {
    console.log(query);
    return this.teacherService.findAllSorted(query);
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  async getDashboard(@Req() req: RequestWithUser) {
    const userId = req.user?.id;

    return this.teacherService.getDashboard(userId);
  }
}
