import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      url: 'amqps://rtztwavn:sHnStelCK5EVRW-hFc6p9N_kDs-4UBvU@hornet.rmq.cloudamqp.com/rtztwavn',
      queue: 'user',
      queueOptions: {
        durable: true,
      },
    }
  });
  await app.listen(() => logger.log("Microservice User is listening"));
}
bootstrap();



url: 