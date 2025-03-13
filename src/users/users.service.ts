import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import mongoose from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
  ) {}

  hashPassword(password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.hashPassword(createUserDto.password);
    return await this.userModel.create({
      fullName: createUserDto.fullName,
      email: createUserDto.email,
      password: hashPassword,
      phone: createUserDto.phone,
    });
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({ email: username });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Not Found User';
    }
    return this.userModel.softDelete({ _id: id });
  }
}
