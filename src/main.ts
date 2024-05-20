import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/*
Con la linea app.useGlobalPipes(new ValidationPipe()); "activo" a las class-validator de los DTOS
*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
