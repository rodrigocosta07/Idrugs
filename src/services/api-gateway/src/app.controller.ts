import { Controller, Get, Post, Req, UseFilters } from '@nestjs/common';
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
}
