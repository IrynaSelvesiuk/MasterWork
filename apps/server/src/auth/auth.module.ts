import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { HashModule } from 'src/shared/hash/hash.module';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtAuthGuard } from './jwt-auth-guard';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
  imports: [
    HashModule,
    JwtModule,
    forwardRef(() => UserModule),
    forwardRef(() => TeacherModule),
  ],
  providers: [AuthService, TokenService, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard, TokenService],
})
export class AuthModule {}
