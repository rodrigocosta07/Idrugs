import { Body, Controller, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { MessagePattern } from "@nestjs/microservices";
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './user.decorator';
import { User } from 'src/user/user.model';
import { ExceptionFilter } from 'filter/rpc-exception.filter';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @MessagePattern({ cmd: "signup" })
    @UseFilters(new ExceptionFilter())
    async signUp(
      @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<{ message: string }> {
      await this.authService.signUp(createUserDto);
      return {
        message: 'Cadastro realizado com sucesso',
      };
    }
    
    @MessagePattern({ cmd: "signUpEstablishment" })
    async signUpEstablishment(
      @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<{ message: string }> {
      await this.authService.signUpEstablishment(createUserDto);
      return {
        message: 'Cadastro realizado com sucesso',
      };
    }


    @MessagePattern({ cmd: "signin" })
    async signIn(
      @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
    ): Promise<{ token: string }> {
      return await this.authService.signIn(credentiaslsDto);
    }

    @MessagePattern({ cmd: "me" })
    @UseGuards(AuthGuard())
    getMe(@GetUser() req): User {
      return req.user;
    }
}
