import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  getHello(): {} {
    const test = this.appService.getHello()
    return {'message':test} ;
  }
  @Post('/test')
  getPost(@Body() obj): {} {
    const test = this.appService.getHello()
    console.log(obj);
    
    return {'message':obj} ;
  }

  @Get('hello/:name')
  getHelloName(@Param('name') name: string): {} {
    return this.appService.getHelloName(name);
  }

  @Post('hello/cred')
  returnSubmitted(@Body() obj): {} {
    console.log('got ', obj);

    return { obj };
  }
}
