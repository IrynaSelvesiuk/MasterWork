import { Module } from '@nestjs/common';
import { HashService } from './services/hash.service';

@Module({
  imports: [],
  providers: [HashService],
  exports: [HashService],
})
export class HashModule {}
