import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { JwtAuthGuard } from './jwt-auth-guard';
import { HashModule } from '../shared/hash/hash.module';
import { StudentModule } from '../student/student.module';
import { TeacherModule } from '../teacher/teacher.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    HashModule,
    JwtModule,
    forwardRef(() => UserModule),
    forwardRef(() => TeacherModule),
    forwardRef(() => StudentModule),
  ],
  providers: [AuthService, TokenService, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard, TokenService],
})
export class AuthModule {}
