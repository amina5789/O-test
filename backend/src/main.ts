import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
  });

  await app.listen(3000);
}

bootstrap().catch((err) => {
  console.error('Application failed to start:', err);
});
