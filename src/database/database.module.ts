import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseController } from 'src/database/database.controller';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService, UsersService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class DatabaseModule {}
