import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ClientsModule.register([
    {
      name: "SERVICE_USER",
      transport: Transport.TCP,
      options: {
        host: "127.0.0.1",
        port: 8888
      }
    },
    {
      name: "SERVICE_PRODUCT",
      transport: Transport.TCP,
      options: {
        host: "127.0.0.1",
        port: 8889
      }
    },
    {
      name: 'USER_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://rtztwavn:sHnStelCK5EVRW-hFc6p9N_kDs-4UBvU@hornet.rmq.cloudamqp.com/rtztwavn'],
        queue: 'user',
        queueOptions: {
          durable: false
        },
      }
    }
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
