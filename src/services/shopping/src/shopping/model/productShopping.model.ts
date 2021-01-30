import {
    Entity, Column, Unique, PrimaryGeneratedColumn, CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm';

@Entity('productShopping')
export class ProductShoppingModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false, type: 'decimal', default: 0 })
    value: number;
    
    @Column({ nullable: false, type: 'varchar', length: 200 })
    IdProduct: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    IdEstablishment: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    IdCart: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
