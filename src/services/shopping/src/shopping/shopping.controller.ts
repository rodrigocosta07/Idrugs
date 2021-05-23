import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChangeStatusDto } from './dto/ChangeStatus.dto';
import { GetByEstablishmentIdDto, GetByIdDto, GetByUserIdDto } from './dto/GetModel';
import { GetStatusDto } from './dto/GetStatus.dto';
import { ReturnAllShoppingDto, ReturnShoppingDto } from './dto/ReturnShoppingDto';
import { CreatShoppingCartDto } from './dto/shopping.dto';
import { ShoppingService } from './shopping.service';

@Controller('shopping')
export class ShoppingController {
    constructor(private shoppingService: ShoppingService) { }

    @MessagePattern({ cmd: "confirmPurchase" })
    async confirmPurchase(creatShoppingCartDto: CreatShoppingCartDto): Promise<ReturnShoppingDto> {
        const shopping = await this.shoppingService.createShopping(creatShoppingCartDto);
        return {
            message: 'Pedido confirmado com sucesso',
            shopping
        };
    }

    @MessagePattern({ cmd: "changeStatus" })
    async changeStatus(status: ChangeStatusDto): Promise<ReturnShoppingDto> {
        const shopping = await this.shoppingService.changeStatusRequest(status);
        return {
            message: 'Status Alterado com sucesso',
            shopping
        };
    }

    @MessagePattern({ cmd: "getStatus" })
    async getStatus(getStatusDto: GetStatusDto): Promise<ReturnShoppingDto> {
        const shopping = await this.shoppingService.getStatus(getStatusDto);
        return {
            message: 'Pedido retornado com sucesso!',
            shopping
        };
    }

    @MessagePattern({ cmd: "getByEstablishment" })
    async getByEstablishment(getStatusDto: GetByEstablishmentIdDto): Promise<ReturnAllShoppingDto> {
        const shopping = await this.shoppingService.getByEstablishment(getStatusDto);
        return {
            message: 'Pedido retornado com sucesso!',
            shopping
        };
    }

    @MessagePattern({ cmd: "getByUser" })
    async getByUser(getStatusDto: GetByUserIdDto): Promise<ReturnAllShoppingDto> {
        const shopping = await this.shoppingService.getByUser(getStatusDto);
        return {
            message: 'Pedido retornado com sucesso!',
            shopping
        };
    }


    @MessagePattern({ cmd: "getById" })
    async getById(creatShoppingCartDto: GetByIdDto): Promise<ReturnShoppingDto> {
        const shopping = await this.shoppingService.getById(creatShoppingCartDto);
        return {
            message: 'Pedido retornado com sucesso!',
            shopping
        };
    }
}
