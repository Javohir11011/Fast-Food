import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UUIDInterceptor } from './config/pipe/uuid';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new UUIDInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
