import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HashService } from 'src/shared/hash/services/hash.service';
import { CreateTutorDto } from 'src/tutor/dto/createTutor.dto';
import { TutorService } from 'src/tutor/services/tutor.service';
import { TokenService } from './token.service';
import { JwtPayload } from '../types/jwt-payload.interface';
import { Tutor } from 'src/tutor/entities/tutor.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly tutorService: TutorService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  private generatePayload(tutor: Tutor): JwtPayload {
    return { sub: tutor.id, email: tutor.email };
  }

  public async login(email: string, password: string) {
    const tutor = await this.tutorService.findOneBy('email', email);
    if (!tutor) {
      throw new NotFoundException('Invalid credentials');
    }

    const passwordMatch = await this.hashService.compare(
      password,
      tutor.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = this.generatePayload(tutor);
    const tokens = await this.tokenService.generateTokens(payload);

    return {
      ...tokens,
      user: {
        id: tutor.id,
        email: tutor.email,
      },
    };
  }

  public async register(createTutorDto: CreateTutorDto) {
    console.log(createTutorDto);
    const hashedPassword = await this.hashService.hash(createTutorDto.password);
    const tutor = await this.tutorService.create({
      ...createTutorDto,
      password: hashedPassword,
    });
    const payload = this.generatePayload(tutor);
    return this.tokenService.generateTokens(payload);
  }

  public async logout() {}
}
