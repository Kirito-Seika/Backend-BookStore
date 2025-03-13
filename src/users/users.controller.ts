import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/types/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage('Create User')
  async create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    let newUser = await this.usersService.create(createUserDto, user);
    return {
      _id: newUser?._id,
      fullName: newUser?.fullName,
      email: newUser?.email,
      phone: newUser?.phone,
      role: newUser?.role,
      avatar: newUser?.avatar,
      isActive: newUser?.isActive,
      createdAt: newUser?.createdAt,
      updatedAt: newUser?.updatedAt,
    };
  }

  @Public()
  @Get()
  @ResponseMessage('Fetch All User')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() reqString: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, reqString);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Get User by Id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put()
  @ResponseMessage('Update User')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete User')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
