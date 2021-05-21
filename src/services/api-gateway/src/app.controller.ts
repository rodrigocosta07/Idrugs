import { Controller, ExceptionFilter, Get, Param, Post, Req, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { AllExceptionsFilter } from 'filter/AllExceptionsFilter.filter';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("/signup")
  signup(@Req() request: Request) {
    return this.appService.signup(request.body);
  }
  
  @Post("/signupEstablishment")
  signupEstablishment(@Req() request: Request) {
    return this.appService.signupEstablishment(request.body);
  }

  

  @Post("/signin")
  signin(@Req() request: Request) {
    console.log(request)
    return this.appService.signin(request.body);
  }

  @Post("/confirmPurchase")
  async confirmPurchase(@Req() request: Request) {
    const user = await this.appService.getCurrentUser(request.headers.authorization, 'USER');
    if (user) {
      request.body.idUser = user.id
      return this.appService.confirmPurchase(request.body);
    } 
  }

  @Post("/changeStatus")
  changeStatus(@Req() request: Request) {
    return this.appService.changeStatus(request.body);
  }

  @Post("/createProduct")
  async createProduct(@Req() request: Request) {
    const user = await this.appService.getCurrentUser(request.headers.authorization, 'ESTABLISHMENT');
    if (user) {
      return this.appService.createProduct(request.body);
    }
  }

  @Get("/getUser")
  async GetUser(@Req() request: Request) {
    const user = await this.appService.getCurrentUser(request.headers.authorization , '');
    if (user) {
      return user;
    }
  }
  
  @Post("/editProduct")
  async editProduct(@Req() request: Request) {
    const user = await this.appService.getCurrentUser(request.headers.authorization, 'ESTABLISHMENT');
    const establishment = user.establishments.find((est) => est.id === request.body.IdEstablishment)
    if (user && establishment) {
      return this.appService.editProduct(request.body);
    } else {
      throw "Usuário sem permissão para alterar o produto"
    }
  }
  @Get("/getAllProducts")
  getAllProducts(@Req() request: Request) {
    return this.appService.getAllProducts(request.body);
  }

  @Get("/getProduct/:id")
  getProduct(@Param('id') id: string) {
    return this.appService.getProduct(id);
  }

 
}
