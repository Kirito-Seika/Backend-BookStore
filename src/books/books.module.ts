import { Module } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { BooksController } from 'src/books/books.controller';

@Module({
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
