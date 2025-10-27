import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no definidas en los DTOs
    transform: true, // Transforma tipos automáticamente
    forbidNonWhitelisted: true, // Arroja error si se envían propiedades no definidas
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
