import {
    Entity, Column, Unique, PrimaryGeneratedColumn, CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm';

@Entity('product')
export class ProductModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false, type: 'int', default: 0 })
    amount: number;

    @Column({ nullable: false, type: 'decimal', default: 0 })
    value: number;

    @Column({ nullable: false, type: 'varchar', length: 500 })
    image: string;

    @Column({ nullable: false, type: 'varchar', length: 200})
    IdEstablishment: string;

    @Column({ nullable: false, default: true })
    status: boolean;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
