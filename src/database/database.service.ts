import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Book, BookDocument } from 'src/books/schemas/book.schema';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Book.name)
    private bookModel: SoftDeleteModel<BookDocument>,
    private configService: ConfigService,
    private userService: UsersService,
    private bookService: BooksService,
  ) {}

  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
}
