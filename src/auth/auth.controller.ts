import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginInput } from './dto/login.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/register')
  signUp(
    //ParseIntPipe converts it to a number
    // @Body('password',ParseIntPipe) password: string,
    @Body() dto: LoginInput
  ) {
    //would print the body
    console.log(dto);

    // return this.auth.createUser(dto);
  }
  @Post('/register/staff')
  registerStaff(
    //ParseIntPipe converts it to a number
    // @Body('password',ParseIntPipe) password: string,
    @Body() dto: LoginInput
  ) {
    //would print the body
    console.log(dto);

    // return this.auth.createUser(dto);
  }


  @Post('/login')
  signIn(
    //ParseIntPipe converts it to a number
    // @Body('password',ParseIntPipe) password: string,
    @Body() dto: LoginInput
  ) {
    //would print the body
    console.log(dto);

    // return this.auth.login(dto.email, dto.password);
  }
}
