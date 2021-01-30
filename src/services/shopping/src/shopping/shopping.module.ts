import { Module } from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { ShoppingController } from './shopping.controller';

@Module({
  providers: [ShoppingService],
  controllers: [ShoppingController]
})
export class ShoppingModule {}
