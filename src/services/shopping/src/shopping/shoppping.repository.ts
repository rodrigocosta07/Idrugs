import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ShoppingModel, typeStatus } from './model/shopping.model';
import { CreatShoppingCartDto, editProductDto } from './dto/shopping.dto';
import { exception } from 'console';
import { ProductShoppingModel } from './model/productShopping.model';
@EntityRepository(ShoppingModel)
export class ShoppingCartRepository extends Repository<ShoppingModel> {

  async createProduct(
    createShoppingDto: CreatShoppingCartDto
  ): Promise<ShoppingModel> {
    const { IdUser, TotalValue, address, freightValue, payment, products, status, IdEstablishment } = createShoppingDto;

    const shoppingCart = this.create();
    shoppingCart.IdUser = IdUser;
    shoppingCart.TotalValue = TotalValue;
    shoppingCart.IdEstablishment = IdEstablishment;
    shoppingCart.status = typeStatus.NEW;
    shoppingCart.address = address;
    shoppingCart.freightValue = freightValue;
    shoppingCart.payment = payment;
    shoppingCart.status = status;
    try {
      await shoppingCart.save();
      let productsShopping = []
      products.forEach(async (product) => {
        const productShopping = new ProductShoppingModel()
        productShopping.IdCart = shoppingCart.id
        productShopping.IdEstablishment = product.IdEstablishment
        productShopping.IdProduct = product.IdProduct
        productShopping.name = product.name
        productShopping.value = product.value
        await productShopping.save()
        productsShopping.push(productShopping)
      })
      shoppingCart.products = productsShopping
      return shoppingCart;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o produto no banco de dados',
      );
    }
  }

  // async getAllProducts(): Promise<ShoppingModel[]> {
  //   const products = this.find({
  //     where: {
  //       status: true
  //     }
  //   });
  //   return products;
  // }

  // async getProduct(id: string): Promise<ShoppingModel> {
  //   const product = this.findOne({
  //     where: {
  //       status: true,
  //       id: id
  //     }
  //   });
  //   return product;
  // }

  // async editProduct(editProduct: editProductDto): Promise<ShoppingModel> {
  //   const product = this.findOne({
  //     where: {
  //       status: true,
  //       id: editProduct.id
  //     }
  //   });

  //   if (!product) {
  //     throw new exception("Produto não encontrado!")
  //   }
  //   (await product).name = editProduct.name;
  //   (await product).image = editProduct.image;
  //   (await product).amount = editProduct.amount;
  //   (await product).value = editProduct.value;
  //   (await product).status = editProduct.status;
  //   (await product).updatedAt = new Date();

  //   try {
  //     await (await product).save();
  //     return product;
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'Erro ao atualizar o produto no banco de dados',
  //     );
  //   }
  // }
}