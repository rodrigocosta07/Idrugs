import { HttpException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/user.model';
import { UserRepository } from 'src/user/user.repository';
import { UserType } from 'src/user/userType';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        } else {
            return await this.userRepository.createUser(createUserDto, UserType.USER);
        }
    }

    async signUpEstablishment(createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        } else {
            return await this.userRepository.createEstablishment(createUserDto, UserType.ESTABLISHMENT);
        }
    }

    async signIn(credentialsDto: CredentialsDto) {
        const user = await this.userRepository.checkCredentials(credentialsDto);

        if (user === null) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const jwtPayload = {
            id: user.id,
        };
        const token = await this.jwtService.sign(jwtPayload);

        return { token };
    }

    async checkUser(token: string) {
        if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1]
        }
        try{
            var infoUser = this.jwtService.verify(token)
            let user;
            if (infoUser) {
                user = await this.userRepository.findOne({
                    where: {
                        id: infoUser.id,
                        status: true
                    },
                    relations: ['establishments', 'address']
                })
            } else {
                throw new UnauthorizedException('Credenciais inválidas');
            }
            return user
        }catch(error) {
            console.error(error)
            if(error && error.name === 'TokenExpiredError'){
                throw new HttpException(error.message, 401)
            }
            return error
        }
        
    }
}
