import { ShoppingModel } from '../model/shopping.model';

export class ReturnShoppingDto {
    shopping: ShoppingModel;
    message: string;
}

export class ReturnAllShoppingDto {
    shopping: ShoppingModel[];
    message: string;
}
