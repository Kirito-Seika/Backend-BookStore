import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { Public, ResponseMessage } from 'src/decorator/customize';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ResponseMessage('Create Book')
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Public()
  @Get()
  @ResponseMessage('Get All Books')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() reqString: string,
  ) {
    return this.booksService.findAll(+currentPage, +limit, reqString);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Get Book by Id')
  async findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put()
  @ResponseMessage('Update Book')
  update(@Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(updateBookDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete Book')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
