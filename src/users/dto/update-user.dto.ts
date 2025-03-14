import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'email',
  'password',
] as const) {
  @IsNotEmpty({ message: 'Id không được để trống' })
  _id: string;
}
