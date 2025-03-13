import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //login
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Login User')
  @Post('/login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }
  @Public()
  @Post('/register')
  @ResponseMessage("Register User")
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
