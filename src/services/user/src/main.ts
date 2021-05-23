import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
require('dotenv/config');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT],
      queue: 'user',
      queueOptions: {
        durable: false,
      },
    }
  });
  
  await app.listenAsync()
  const apirest = await NestFactory.create(AppModule);
  apirest.enableCors();
  await apirest.listen(process.env.PORT || 3000);
}
bootstrap();