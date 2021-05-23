import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeStatusDto } from './dto/ChangeStatus.dto';
import { CreatShoppingCartDto } from './dto/shopping.dto';
import { ShoppingModel } from './model/shopping.model';
import { ShoppingCartRepository } from './shoppping.repository';
import { GetStatusDto } from './dto/GetStatus.dto';
import { GetByEstablishmentIdDto, GetByIdDto, GetByUserIdDto } from './dto/GetModel';

@Injectable()
export class ShoppingService {
    constructor(
        @InjectRepository(ShoppingCartRepository)
        private shopping: ShoppingCartRepository,
        
    ) { }

    async createShopping(creatShoppingCartDto: CreatShoppingCartDto): Promise<ShoppingModel> {
        return this.shopping.createProduct(creatShoppingCartDto);
    }

    async getStatus(getStatusDto: GetStatusDto): Promise<ShoppingModel> {
        return this.shopping.getStatus(getStatusDto);
    }

    async getByEstablishment(getByEstablishmentDto: GetByEstablishmentIdDto): Promise<ShoppingModel[]> {
        return this.shopping.getOrdersByEstablishment(getByEstablishmentDto);
    }


    async getByUser(getUserIdDto: GetByUserIdDto): Promise<ShoppingModel[]> {
        return this.shopping.getOrdersByUser(getUserIdDto);
    }

    async getById(getStatusDto: GetByIdDto): Promise<ShoppingModel> {
        return this.shopping.getOrdersById(getStatusDto);
    }

    async changeStatusRequest(request: ChangeStatusDto): Promise<ShoppingModel> {
        return await this.shopping.changeStatus(request);
    }
}
