import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChangeStatusDto } from './dto/changeStatus.dto';
import { ReturnShoppingDto } from './dto/ReturnShoppingDto';
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
    async changeStatus(creatShoppingCartDto: ChangeStatusDto): Promise<ReturnShoppingDto> {
        const shopping = await this.shoppingService.changeStatusRequest(creatShoppingCartDto);
        return {
            message: 'Status alterado com sucesso',
            shopping
        };
    }
}
