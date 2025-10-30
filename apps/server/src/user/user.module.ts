import { forwardRef, Module } from '@nestjs/common';
import { HashModule } from 'src/shared/hash/hash.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { TeacherModule } from 'src/teacher/teacher.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HashModule,
    forwardRef(() => AuthModule),
    forwardRef(() => TeacherModule),
    forwardRef(() => StudentModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
