import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from 'filter/AllExceptionsFilter.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
