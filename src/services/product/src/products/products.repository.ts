import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { ProductModel } from './product.model';
import { CreateProductDto } from './dto/product.dto';
@EntityRepository(ProductModel)
export class ProductRepository extends Repository<ProductModel> {

  async createProduct(
    createProductDto: CreateProductDto
  ): Promise<ProductModel> {
    const { name, IdEstablishment, value, amount, image } = createProductDto;

    const product = this.create();
    product.amount = amount;
    product.name = name;
    product.IdEstablishment = IdEstablishment;
    product.status = true;
    product.value = value;
    product.image = image;
    try {
      await product.save();
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o produto no banco de dados',
      );
    }
  }

  async getAllProducts(): Promise<ProductModel[]> {
    const products = this.find({
      where: {
        status: true
      }
    });
    return products;
  }

}