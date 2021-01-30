import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { ShoppingModule } from './shopping/shopping.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ShoppingModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
