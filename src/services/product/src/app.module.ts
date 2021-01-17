import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
