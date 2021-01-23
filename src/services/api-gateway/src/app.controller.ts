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

  @Post("/signin")
  signin(@Req() request: Request) {
    return this.appService.signin(request.body);
  }

  @Post("/createProduct")
  async createProduct(@Req() request: Request) {
    const userId = await this.appService.getCurrentUser(request.headers.authorization);
    if (userId) {
      request.body.IdEstablishment = userId
      return this.appService.createProduct(request.body);
    }
  }
  
  @Post("/editProduct")
  async editProduct(@Req() request: Request) {
    const userId = await this.appService.getCurrentUser(request.headers.authorization);
    if (userId) {
      return this.appService.editProduct(request.body);
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
