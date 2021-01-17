import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from "rxjs/operators";

@Injectable()
export class AppService {
  constructor(
    @Inject("SERVICE_USER") private readonly clientServiceA: ClientProxy
  ) {}

  signup(payload) {
    return this.clientServiceA
    .send<any>({cmd: 'signup'}, payload).toPromise();
  }

  signin(payload) {
    console.log(payload);
    return this.clientServiceA
    .send<any>({cmd: 'signin'}, payload)
  }

  createProduct(payload) {
    console.log(payload);
    return this.clientServiceA
    .send<any>({cmd: 'createProduct'}, payload)
  }

  getAllProducts(payload) {
    console.log(payload);
    return this.clientServiceA
    .send<any>({cmd: 'getAllProducts'}, payload)
  }
}
