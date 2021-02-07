import { Module } from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { ShoppingController } from './shopping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartRepository } from './shoppping.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCartRepository])],
  providers: [ShoppingService],
  controllers: [ShoppingController]
})
export class ShoppingModule {}
