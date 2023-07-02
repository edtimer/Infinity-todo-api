import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/@generated/graphql/user/user.model';


import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  user: User;
}
