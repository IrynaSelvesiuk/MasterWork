import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import configuration from './config/env.config';
import { validationSchema } from './config/validation.schema';
import { HashModule } from './shared/hash/hash.module';
import { AuthModule } from './auth/auth.module';
import { TutorModule } from './tutor/tutor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [configuration],
    }),
    DatabaseModule,
    HashModule,
    TutorModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
