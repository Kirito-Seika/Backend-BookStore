import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseController } from 'src/database/database.controller';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Book, BookSchema } from 'src/books/schemas/book.schema';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
})
export class DatabaseModule {}
