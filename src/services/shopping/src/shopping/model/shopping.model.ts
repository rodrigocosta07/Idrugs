import {
    Entity, Column, Unique, PrimaryGeneratedColumn, CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
} from 'typeorm';

import { ProductShoppingModel } from "./productShopping.model";
export enum typeStatus {
    NEW = "new",
    PREPARING_FOR_SHIPMENT = "preparing_for_shipment",
    ORDER_ON_THE_WAY = "order_on_the_way",
    ORDER_DELIVERED = "order_delivered"

}

@Entity('shopping')
export class ShoppingModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    address: string;

    @Column({ nullable: false, type: 'decimal', default: 0 })
    TotalValue: number;

    @Column({ nullable: false, type: 'decimal', default: 0 })
    freightValue: number

    @Column({ nullable: false, type: 'varchar', length: 200 })
    IdEstablishment: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    IdUser: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    payment: string

    @Column({ type: "set", enum: typeStatus, default: [typeStatus.NEW], nullable: false })
    status: typeStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => ProductShoppingModel, product => product.IdCart)
    products: ProductShoppingModel[];
}
