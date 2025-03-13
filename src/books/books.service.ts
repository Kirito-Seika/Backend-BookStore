import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from 'src/books/schemas/book.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: SoftDeleteModel<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    return await this.bookModel.create({
      thumbnail: createBookDto.thumbnail,
      mainText: createBookDto.mainText,
      author: createBookDto.author,
      price: createBookDto.price,
      quantity: createBookDto.quantity,
      category: createBookDto.category,
    });
  }

  findAll() {
    return this.bookModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(updateBookDto: UpdateBookDto) {
    return this.bookModel.updateOne(
      { _id: updateBookDto._id },
      { ...updateBookDto },
    );
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Not Found Book';
    }
    return this.bookModel.softDelete({ _id: id });
  }
}
