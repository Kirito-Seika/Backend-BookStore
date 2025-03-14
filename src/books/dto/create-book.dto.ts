import { IsNotEmpty, Validate } from 'class-validator';
import {
  IsAuthorValidConstraint,
  IsCategoryValidConstraint,
  IsMainTextValidConstraint,
  IsPriceValidConstraint,
  IsQuantityValidConstraint,
} from 'src/books/validator/validator.book';

export class CreateBookDto {
  @IsNotEmpty({ message: 'thumbnail không được để trống' })
  thumbnail: string;

  @Validate(IsMainTextValidConstraint)
  mainText: string;

  @Validate(IsAuthorValidConstraint)
  author: string;

  @Validate(IsPriceValidConstraint)
  price: number;

  @Validate(IsQuantityValidConstraint)
  quantity: number;

  @Validate(IsCategoryValidConstraint)
  category: string;
}
