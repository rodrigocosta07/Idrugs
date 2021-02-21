import { Module } from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { ShoppingController } from './shopping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartRepository } from './shoppping.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
require('dotenv/config');

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCartRepository]),

  ClientsModule.register([
    {
      name: 'SHOPPING_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT],
        queue: 'shopping',
        queueOptions: {
          durable: false
        },
      }
    }]),],
  providers: [ShoppingService],
  controllers: [ShoppingController]
})
export class ShoppingModule { }
