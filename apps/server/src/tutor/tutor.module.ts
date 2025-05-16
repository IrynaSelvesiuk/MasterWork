import { Module } from '@nestjs/common';
import { TutorService } from './services/tutor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from './entities/tutor.entity';
import { TutorController } from './controllers/tutor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor])],
  providers: [TutorService],
  controllers: [TutorController],
  exports: [TutorService],
})
export class TutorModule {}
