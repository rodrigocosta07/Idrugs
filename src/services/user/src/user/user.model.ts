import {
    Entity, Column, Unique, PrimaryGeneratedColumn, CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Establishment } from './establishment.model';
import { UserAddress } from './userAddress.model';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    email: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false, type: 'varchar', length: 20 })
    type: string;

    @Column({ nullable: false, default: true })
    status: boolean;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true, type: 'varchar', length: 64 })
    confirmationToken: string;

    @Column({ nullable: true, type: 'varchar', length: 64 })
    recoverToken: string;

    @Column({ nullable: true, type: 'varchar', length: 64 })
    phone: string

    @Column({ nullable: false })
    salt: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Establishment, establishment => establishment.user)
    establishments: Establishment[];

    @OneToMany(() => UserAddress, address => address.user)
    address: UserAddress[];

    async checkPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
