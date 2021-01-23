import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, editProductDto } from './dto/product.dto';
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

    async getProduct(id: string): Promise<ProductModel> {
        return this.productRepository.getProduct(id);
    }

    async editProduct(editProduct: editProductDto): Promise<ProductModel> {
        return this.productRepository.editProduct(editProduct);
    }
}
