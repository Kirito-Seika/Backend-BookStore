import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from 'src/books/dto/create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
