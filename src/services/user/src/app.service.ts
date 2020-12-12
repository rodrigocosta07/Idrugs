import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  createUser(): string {
    return 'Hello World!';
  }

  updateUser(): string {
    return 'Hello World!';
  }

  deleteUser(): string {
    return 'Hello World!';
  }
}
