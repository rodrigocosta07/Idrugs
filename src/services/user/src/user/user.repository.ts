import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.model';
import { UserType } from './userType';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(
        createUserDto: CreateUserDto,
        type: UserType,
      ): Promise<User> {
        const { email, name, password , phone} = createUserDto;
    
        const user = this.create();
        user.email = email;
        user.name = name;
        user.type = type;
        user.status = true;
        user.phone = phone;
        user.confirmationToken = crypto.randomBytes(32).toString('hex');
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
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