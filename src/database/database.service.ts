import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}

  async onModuleInit() {
    const isInit = this.configService.get<string>('SHOULD_INIT');
    if (Boolean(isInit)) {
      const countUser = await this.userModel.countDocuments({});

      if (countUser === 0) {
        await this.userModel.insertMany([
          {
            fullName: "Admin",
            email: 'admin@gmail.com',
            password: this.userService.hashPassword(
              this.configService.get<string>('MIGRATION_USER_PASSWORD'),
            ),
            phone: '0365741416',
            role: 'ADMIN',
            avatar: 'default.jpg',
          },
          {
            fullName: "Kirito Nguyễn",
            email: 'kirito@gmail.com',
            password: this.userService.hashPassword(
              this.configService.get<string>('MIGRATION_USER_PASSWORD'),
            ),
            phone: '0365741416',
            role: 'ADMIN',
            avatar: 'default.jpg',
          },
          {
            fullName: "User",
            email: 'user@gmail.com',
            password: this.userService.hashPassword(
              this.configService.get<string>('MIGRATION_USER_PASSWORD'),
            ),
            phone: '0365741416',
            role: 'USER',
            avatar: 'default.jpg',
          },
        ]);
      }
    }
  }
}
