import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashService } from 'src/shared/hash/services/hash.service';
import { TokenService } from './token.service';
import { JwtPayload } from '../types/jwt-payload.interface';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { TeacherService } from 'src/teacher/services/teacher.service';
import { AuthResponse } from '../types/auth-response';
import { CreateTeacherDto } from 'src/teacher/dto/create-teacher.dto';
import { Role } from 'src/enums/roles.enum';
import { Teacher } from 'src/teacher/teacher.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly teacherService: TeacherService,
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
    data: CreateUserDto | CreateTeacherDto,
  ): Promise<AuthResponse> {
    const user = await this.userService.createUser(data);

    let teacher: Teacher | undefined;
    if ('bio' in data || data.role === Role.Teacher) {
      const teacherData = data as CreateTeacherDto;
      teacher = await this.teacherService.createTeacher({
        user,
        bio: teacherData.bio,
        subjects: teacherData.subjects,
        yearsOfExperience: teacherData.yearsOfExperience,
        hourlyRate: teacherData.hourlyRate,
        location: teacherData.location,
      });
    }

    const payload = this.generatePayload(user);
    const tokens = await this.tokenService.generateTokens(payload);

    return { user, teacher, ...tokens };
  }

  public async logout() {}
}
