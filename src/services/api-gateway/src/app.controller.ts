import { Controller, Get, Param, Post, Req, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';


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
    return this.appService.signin(request.body);
  }

  @Post("/createProduct")
  async createProduct(@Req() request: Request) {
    const user = await this.appService.getCurrentUser(request.headers.authorization);
    if (user) {
      return this.appService.createProduct(request.body);
    }
  }
  
  @Post("/editProduct")
  async editProduct(@Req() request: Request) {
    const user = await this.appService.getCurrentUser(request.headers.authorization);
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
