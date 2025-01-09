import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { API } from './app/routes/route.contants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['*'] });

  app.setGlobalPrefix(API);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }),
  );

  await app.listen(3000);
}
bootstrap();
