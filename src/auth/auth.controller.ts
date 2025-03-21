import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { IUser } from 'src/users/types/user.interface';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Login User')
  @Post('/login')
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response, @Body() body: any) {
    return this.authService.login(req.user, response, body.delay);
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
  getProfile(@User() user: IUser) {
    return { user };
  }

  @ResponseMessage('Logout User')
  @Post('/logout')
  handleLogout(@Res({ passthrough: true }) response: Response, @User() user: IUser,
  ) {
    return this.authService.logout(response, user);
  }
}
