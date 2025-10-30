import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentController } from './student.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  providers: [StudentService],
  exports: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
