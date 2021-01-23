import { Body, Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateProductDto, editProductDto } from './dto/product.dto';
import { ReturnProductDto } from './dto/returnProduct.dto';
import { ProductModel } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) { }

    @MessagePattern({ cmd: "createProduct" })
    async createAdminUser(
       createProductDto: CreateProductDto,
    ): Promise<ReturnProductDto> {
        const product = await this.productsService.createProduct(createProductDto);
        return {
            product,
            message: 'Produto cadastrado com sucesso',
        };
    }

    @MessagePattern({ cmd: "getAllProducts" })
    async getAllProducts(): Promise<ProductModel[]> {
        const products = await this.productsService.getAllProducts();
        return products;
    }

    @MessagePattern({ cmd: "getProduct" })
    async getProduct(id: string): Promise<ProductModel> {
        const product = await this.productsService.getProduct(id);
        return product;
    }

    @MessagePattern({ cmd: "editProduct" })
    async editProduct(editProductDto: editProductDto): Promise<ReturnProductDto> {
        const product = await this.productsService.editProduct(editProductDto);
        return {
            product,
            message: 'Produto alterado com sucesso'
        };
    }
}
