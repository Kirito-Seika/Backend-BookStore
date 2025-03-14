import { Validate } from 'class-validator';
import {
  IsEmailValidConstraint,
  IsNameValidConstraint,
  IsPasswordValidConstraint,
  IsPhoneValidConstraint,
} from 'src/users/validator/validator.user';

export class RegisterUserDto {
  @Validate(IsNameValidConstraint)
  fullName: string;

  @Validate(IsEmailValidConstraint)
  email: string;

  @Validate(IsPasswordValidConstraint)
  password: string;

  @Validate(IsPhoneValidConstraint)
  phone: string;

  delay?: number;
}