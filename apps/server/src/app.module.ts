import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import configuration from './config/env.config';
import { validationSchema } from './config/validation.schema';
import { HashModule } from './shared/hash/hash.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [configuration],
    }),
    DatabaseModule,
    HashModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
