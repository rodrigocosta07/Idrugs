import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatShoppingCartDto } from './dto/shopping.dto';
import { ShoppingModel } from './model/shopping.model';
import { ShoppingCartRepository } from './shoppping.repository';

@Injectable()
export class ShoppingService {
    constructor(
        @InjectRepository(ShoppingCartRepository)
        private shopping: ShoppingCartRepository,
        
    ) { }

    async createShopping(creatShoppingCartDto: CreatShoppingCartDto): Promise<ShoppingModel> {
        return this.shopping.createProduct(creatShoppingCartDto);
    }
}
