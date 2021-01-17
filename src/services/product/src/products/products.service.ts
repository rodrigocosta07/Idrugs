import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/product.dto';
import { ProductModel } from './product.model';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository,
    ) { }

    async createProduct(createProductDto: CreateProductDto): Promise<ProductModel> {
        return this.productRepository.createProduct(createProductDto);
    }

    async getAllProducts(): Promise<ProductModel[]> {
        return this.productRepository.getAllProducts();
    }
}
