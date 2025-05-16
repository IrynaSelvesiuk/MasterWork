import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TutorModule } from 'src/tutor/tutor.module';
import { HashModule } from 'src/shared/hash/hash.module';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [TutorModule, HashModule, JwtModule],
  providers: [AuthService, TokenService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
