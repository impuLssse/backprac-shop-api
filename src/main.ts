import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './core/http-exceptions/http-exception-filter';

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  const { httpAdapter } = app.get(HttpAdapterHost)

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter))


  const cfg = new DocumentBuilder()
    .setTitle('Интернет-магазин')
    .setDescription('Учебный API по NestJS и Prisma')
    .setVersion('0.1')
    .build()

  const doc = SwaggerModule.createDocument(app, cfg)
  SwaggerModule.setup('api', app, doc)

  await app.listen(5000);
}

bootstrap();