import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.model';
import { UserType } from './userType';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';
import { UserAddress } from './userAddress.model';
import { Establishment } from './establishment.model';
import { UUIDVersion } from 'class-validator';
@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createUser(
    createUserDto: CreateUserDto,
    type: UserType,
  ): Promise<User> {
    const user = await this.createEntityUser(createUserDto, type)
    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === 'ER_DUP_ENTRY') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

  async createEntityUser(createUserDto: CreateUserDto,
    type: UserType) {
    const { email, name, password, phone } = createUserDto;

    const user = this.create();
    user.email = email;
    user.name = name;
    user.type = type;
    user.status = true;
    user.phone = phone;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    return user
  }

  async createEstablishment(createUserDto: CreateUserDto,
    type: UserType) {
    const user = await this.createEntityUser(createUserDto, type)
    const { userAddress, establishment } = createUserDto;
    const address = new UserAddress()
    const userEstablishment = new Establishment()
    if (userAddress) {
      address.city = userAddress.city
      address.complements = userAddress.complements
      address.state = userAddress.state
      address.zipcode = userAddress.zipcode
      address.street = userAddress.street
      address.number = userAddress.number

    }

    userEstablishment.name = establishment.name
    userEstablishment.cnpj = establishment.cnpj
    userEstablishment.telephone = establishment.telephone

    try {
      await user.save()
      address.userId = user.id
      await address.save()
      userEstablishment.userId = user.id
      userEstablishment.addressId = address.id
      await userEstablishment.save()
      return user
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(
        'Erro ao salvar o usuário no banco de dados',
      );
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.findOne({ email, status: true });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}