import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ProductModel } from './product.model';
import { CreateProductDto, editProductDto } from './dto/product.dto';
import { exception } from 'console';
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

  async getProduct(id: string): Promise<ProductModel> {
    const product = this.findOne({
      where: {
        status: true,
        id
      }
    });
    return product;
  }

  async editProduct(editProduct: editProductDto): Promise<ProductModel> {
    const product = await this.findOne({
      where: {
        status: true,
        id: editProduct.id
      }
    });

    if (!product) {
      throw new exception("Produto não encontrado!")
    }
    product.name = editProduct.name;
    product.image = editProduct.image;
    product.amount = editProduct.amount;
    product.value = editProduct.value;
    product.status = editProduct.status;
    product.updatedAt = new Date();

    try {
      await product.save();
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar o produto no banco de dados',
      );
    }
  }
}