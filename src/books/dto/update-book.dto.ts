import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsNotEmpty({ message: 'Id không được để trống', })
  _id: string;

}
