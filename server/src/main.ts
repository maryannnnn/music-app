import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function start() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  const PORT = configService.get('PORT')
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start();
