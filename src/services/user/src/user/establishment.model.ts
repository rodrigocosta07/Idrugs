import {
    Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
} from 'typeorm';
import { User } from './user.model';

@Entity('establishment')
export class Establishment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    telephone: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    cnpj: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    addressId: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    userId: string;
    
    @ManyToOne(() => User, user => user.establishments)
    user: User

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
