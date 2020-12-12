import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ReturnUserDto } from './dto/returnUser.dto';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { MessagePattern } from "@nestjs/microservices";
import { AuthGuard } from '@nestjs/passport';
import { UserType } from './userType';
import { Type } from '../auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService) { }

    @MessagePattern({ cmd: "createUser" })
    @Type(UserType.ESTABLISHMENT)
    @UseGuards(AuthGuard(), RolesGuard)
    async createAdminUser(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<ReturnUserDto> {
        const user = await this.usersService.createAdminUser(createUserDto);
        return {
            user,
            message: 'Usuário cadastrado com sucesso',
        };
    }
}
