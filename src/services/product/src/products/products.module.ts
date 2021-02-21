import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
require('dotenv/config');
@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]),
  ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT],
        queue: 'product',
        queueOptions: {
          durable: false
        },
      }
    }]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule { }
