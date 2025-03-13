import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
  'email',
] as const) {
  _id: string;
}
