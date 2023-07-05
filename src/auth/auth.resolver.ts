import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,Context
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { Token } from './models/token.model';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { RefreshTokenInput } from './dto/refresh-token.input';

import { GqlAuthGuard } from './gql-auth.guard';
import {  UseGuards } from '@nestjs/common';
import { User } from 'src/@generated/graphql/user/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) { }



  @Mutation(() => Auth)
  async registerUser(@Args('data') data: CreateUserDto) {
    data.email = data.email.toLowerCase();
    const {accessToken,refreshToken} = await this.auth.createUser(data);
    return {
      accessToken,refreshToken
    };
  }


  @Mutation(() => Auth)
  async login(@Args('data') { email, password }: LoginInput,@Context() context:any) {
    const { accessToken, refreshToken } = await this.auth.login(
      context.req,
      email.toLowerCase(),
      password,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
  @Mutation(() => Auth)
  async secureLogin(@Args('data') { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.loginSecure(
      email.toLowerCase(),
      password
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }

  @ResolveField('user', () => User)
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
