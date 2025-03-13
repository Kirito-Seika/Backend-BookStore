import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from 'src/files/dto/create-file.dto';

export class UpdateFileDto extends PartialType(CreateFileDto) {}
