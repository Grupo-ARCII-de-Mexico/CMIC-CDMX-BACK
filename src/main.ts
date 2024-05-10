import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Reemplaza con el dominio de tu aplicación Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });
  app.use(bodyParser.json({ limit: '10mb' }));
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }));
  await app.listen(3003);
}
bootstrap();
