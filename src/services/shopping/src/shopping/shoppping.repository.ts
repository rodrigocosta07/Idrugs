import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ShoppingModel, typeStatus } from './model/shopping.model';
import { CreatShoppingCartDto, editProductDto } from './dto/shopping.dto';
import { exception } from 'console';
import { ProductShoppingModel } from './model/productShopping.model';
import { ChangeStatusDto } from './dto/changeStatus.dto';
@EntityRepository(ShoppingModel)
export class ShoppingCartRepository extends Repository<ShoppingModel> {

  async createProduct(
    createShoppingDto: CreatShoppingCartDto
  ): Promise<ShoppingModel> {
    const { idUser, totalValue, address, freightValue, payment, products, idEstablishment } = createShoppingDto;

    const shoppingCart = this.create();
    shoppingCart.IdUser = idUser;
    shoppingCart.TotalValue = totalValue;
    shoppingCart.IdEstablishment = idEstablishment;
    shoppingCart.status = typeStatus.NEW;
    shoppingCart.address = address;
    shoppingCart.freightValue = freightValue;
    shoppingCart.payment = payment;
    try {
      await shoppingCart.save();
      let productsShopping = []
      for (let index = 0; index < products.length; index++) {
        const product = products[index];
        const productShopping = new ProductShoppingModel()
        productShopping.IdCart = shoppingCart.id
        productShopping.IdEstablishment = product.IdEstablishment
        productShopping.IdProduct = product.IdProduct
        productShopping.name = product.name
        productShopping.value = product.value
        await productShopping.save()
        productsShopping.push(productShopping)
      }
      shoppingCart.products = productsShopping
      return shoppingCart;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o produto no banco de dados',
      );
    }
  }

  async changeStatus(request: ChangeStatusDto): Promise<ShoppingModel> {
    const shopping = await this.findOne({
      where: {
        id: request.idShopping
      }
    });

    if (!shopping) {
      throw new exception("Pedido não encontrado!")
    }
    shopping.status = typeStatus[request.status.toUpperCase()]

    try {
      await shopping.save()
      return shopping
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar o produto no banco de dados',
      );
    }
  }
}