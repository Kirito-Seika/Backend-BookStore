import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/users/types/user.interface';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { Response } from 'express';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) {
        return user;
      }
    }
    return null;
  }

  async login(user: IUser, response: Response) {
    const { _id, fullName, email, phone, role, avatar } = user;
    const payload = { _id, fullName, email, phone, role, avatar };

    const refresh_token = this.refreshToken(payload);

    await this.usersService.updateUserToken(refresh_token, _id);

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE_IN')),
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: { _id, fullName, email, phone, role, avatar },
    };
  }

  async register(user: RegisterUserDto) {
    let newUser = await this.usersService.register(user);
    return {
      _id: newUser?._id,
      email: newUser?.email,
      fullName: newUser.fullName,

    };
  }

  refreshToken = (payload: any) => {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn:
        ms(this.configService.get<string>('JWT_REFRESH_EXPIRE_IN')) / 1000,
    });
  };
}
