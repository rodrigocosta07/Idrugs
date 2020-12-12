import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/user/user.model';

export const GetUser = createParamDecorator(
  (data, req): User => {
    const user = req.args[0].user;
    return user;
  },
);