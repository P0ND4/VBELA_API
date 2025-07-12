import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { API } from './app/routes/route.constants';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ApiResponseInterceptor } from './contexts/shared/interceptor/api.response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware
  app.use((req: any, res: any, next: any) => {
    const logger = new Logger('HTTP');
    const { method, originalUrl } = req;
    const timestamp = new Date().toISOString();
    
    res.on('finish', () => {
      logger.verbose(`[${timestamp}] ${method} ${originalUrl} - ${res.statusCode}`);
    });

    next();
  });

  app.enableCors({ origin: ['*'] });
  app.setGlobalPrefix(API);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  await app.listen(3000);
  console.log('Server is running on http://localhost:3000');
}
bootstrap();
