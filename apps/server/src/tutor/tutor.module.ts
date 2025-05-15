import { Module } from '@nestjs/common';
import { HashModule } from 'src/shared/hash/hash.module';
import { TutorService } from './services/tutor.service';

@Module({
  imports: [HashModule],
  providers: [TutorService],
  exports: [TutorService],
})
export class TutorModule {}
