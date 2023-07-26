import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const PORT_FRONTEND = configService.get<number>('PORT_FRONTEND');

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  const config = new DocumentBuilder()
      .setTitle('Internet shop')
      .setDescription('Document REST API')
      .setVersion('1.0.0')
      .addTag('Neolines')
      .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)

  const PORT = configService.get<number>('PORT');
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start();
