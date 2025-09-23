import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  @Post('login')
  login(@Body() loginDto: { email: string; password: string }) {
    return this.userService.send('auth.login', loginDto);
  }

  @Post('register')
  register(@Body() registerDto: { email: string; password: string }) {
    console.log('bonjour');
    return this.userService.send('auth.register', registerDto);
  }
}
