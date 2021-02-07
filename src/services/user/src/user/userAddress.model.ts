import {
    Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
} from 'typeorm';
import { User } from './user.model';

@Entity('usersAddress')
export class UserAddress extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    street: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    zipcode: string;

    @Column({ nullable: false, type: 'int' })
    number: number;

    @Column({ nullable: true, type: 'varchar', length: 200 })
    complements: string;

    @Column({ nullable: true, type: 'varchar', length: 200 })
    city: string;

    @Column({ nullable: true, type: 'varchar', length: 200 })
    state: string;

    @Column({ nullable: true, type: 'varchar', length: 200 })
    userId: string;

    @ManyToOne(() => User, user => user.address)
    user: User
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
