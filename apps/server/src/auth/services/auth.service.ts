import { Injectable, UnauthorizedException } from '@nestjs/common';

import { TokenService } from './token.service';
import { JwtPayload } from '../types/jwt-payload.interface';

import { AuthResponse } from '../types/auth-response';
import { Role } from '../../enums/roles.enum';
import { HashService } from '../../shared/hash/services/hash.service';
import { Student } from '../../student/student.entity';
import { StudentService } from '../../student/student.service';
import { Teacher } from '../../teacher/entities/teacher.entity';
import { TeacherService } from '../../teacher/services/teacher.service';
import { LoginUserDto } from '../../user/dto/login-user.dto';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { CreateStudentDto } from '../../student/dto/create-student.dto';
import { CreateTeacherDto } from '../../teacher/dto/create-teacher.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
  ) {}

  private generatePayload(user: User): JwtPayload {
    return { sub: user.id, email: user.email, role: user.role };
  }

  public async login(loginUser: LoginUserDto): Promise<AuthResponse> {
    const user = await this.userService.findOneBy('email', loginUser.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await this.hashService.compare(
      loginUser.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = this.generatePayload(user);
    const tokens = await this.tokenService.generateTokens(payload);

    return {
      user,
      ...tokens,
    };
  }

  public async register(
    data: CreateStudentDto | CreateTeacherDto,
  ): Promise<AuthResponse> {
    let teacher: Teacher | undefined;
    let student: Student | undefined;
    const user = await this.userService.createUser(data);

    if (data.role === Role.Teacher) {
      teacher = await this.teacherService.createTeacher(data, user);
    }

    if (data.role === Role.Student) {
      student = await this.studentService.createStudent(data, user);
    }

    const payload = this.generatePayload(user);
    const tokens = await this.tokenService.generateTokens(payload);

    return { user, teacher, student, ...tokens };
  }
}
