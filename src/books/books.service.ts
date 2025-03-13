import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { Book as bookModal, BookDocument } from 'src/books/schemas/book.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(bookModal.name)
    private bookModel: SoftDeleteModel<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const { thumbnail, mainText, author, price, quantity, category } =
      createBookDto;
    let newBook = await this.bookModel.create({
      thumbnail,
      mainText,
      author,
      price,
      quantity,
      category,
    });
    return {
      _id: newBook?._id,
      thumbnail: newBook?.thumbnail,
      mainText: newBook?.mainText,
      author: newBook?.author,
      price: newBook?.price,
      quantity: newBook?.quantity,
      category: newBook?.category,
      createdAt: newBook?.createdAt,
      updatedAt: newBook?.updatedAt,
    };
  }

  async findAll(currentPage: number, limit: number, reqString: string) {
    const { filter, sort, population } = aqp(reqString);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.bookModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.bookModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();
    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Not Found Book';
    }
    return this.bookModel.findById(id);
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
