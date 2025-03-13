import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body, Req, Res,
} from '@nestjs/common';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Login User')
  @Post('/login')
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @Public()
  @Post('/register')
  @ResponseMessage('Register User')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Information User Login')
  @Get('/account')
  getProfile(@Request() req) {
    return req.user;
  }
}
