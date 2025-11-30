import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3005);
}

bootstrap()
  .then(() => console.log('Server is listening on port ', process.env.PORT))
  .catch((err) => console.error('Bootstrap failed', err));
