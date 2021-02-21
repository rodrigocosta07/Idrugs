import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { exception } from 'console';
import { map } from "rxjs/operators";

@Injectable()
export class AppService {
  constructor(
    // @Inject("SERVICE_USER") private readonly userService: ClientProxy,
    @Inject("SERVICE_PRODUCT") private readonly productService: ClientProxy,
    @Inject("USER_SERVICE") private readonly userService: ClientProxy,
  ) { }

  signup(payload) {
    return this.userService
      .send<any>({ cmd: 'signup' }, payload).toPromise();
  }

  signupEstablishment(payload) {
    return this.userService
      .send<any>({ cmd: 'signUpEstablishment' }, payload).toPromise();
  }

  signin(payload) {
    console.log(payload);
    return this.userService
      .send<any>({ cmd: 'signin' }, payload)
  }

  createProduct(payload) {
    return this.productService
      .send<any>({ cmd: 'createProduct' }, payload)
  }

  getAllProducts(payload) {
    console.log(payload);
    return this.productService
      .send<any>({ cmd: 'getAllProducts' }, payload)
  }

  getProduct(payload) {
    console.log(payload);
    return this.productService
      .send<any>({ cmd: 'getProduct' }, payload)
  }

  editProduct(payload) {
    console.log(payload);
    return this.productService
      .send<any>({ cmd: 'editProduct' }, payload)
  }

  async getCurrentUser(payload) {
    try {
      var user = await this.userService
        .send<any>({ cmd: 'currentUser' }, payload).toPromise()
      if (user && user.type === 'ESTABLISHMENT') {
        return user
      } else {
        throw new exception('Usuário não tem permissão para cadastrar produtos')
      }
    } catch (error) {
      throw new exception(error)
    }

  }
}
