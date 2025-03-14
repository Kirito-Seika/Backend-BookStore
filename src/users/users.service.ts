import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/decorator/customize';
import { IUser } from 'src/users/types/user.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { User as userModal, UserDocument } from 'src/users/schemas/user.schema';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(userModal.name)
    private userModel: SoftDeleteModel<UserDocument>,
  ) {}

  hashPassword(password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  private formatUserResponse(user: UserDocument) {
    return {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: `http://localhost:8088/public/images/avatar/${user.avatar}`, // Thêm đường dẫn đầy đủ
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async create(createUserDto: CreateUserDto, @User() user: IUser) {
    const { fullName, email, password, phone, role, avatar, isActive } =
      createUserDto;
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(
        `Email: ${email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác.`,
      );
    }
    const hashPassword = this.hashPassword(password);
    const avatarFileName = 'default.jpg';
    const newUser = await this.userModel.create({
      fullName,
      email,
      password: hashPassword,
      phone,
      role,
      avatar: avatarFileName, // Lưu CHỈ tên file
      isActive,
    });

    return this.formatUserResponse(newUser);
  }

  async register(user: RegisterUserDto) {
    const { fullName, email, password, phone } = user;
    //add logic check email
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(
        `Email: ${email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác.`,
      );
    }
    const hashPassword = this.hashPassword(password);
    return await this.userModel.create({
      fullName,
      email,
      password: hashPassword,
      phone,
      role: 'USER',
    });
  }

  async findAll(currentPage: number, limit: number, reqString: string) {
    const { filter, sort, population } = aqp(reqString);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .select('-password -deletedAt -isDeleted')
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
    };
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Not Found User';
    }
    return this.userModel.findOne({ _id: id }).select('-password');
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({ email: username });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto) {
    const { _id, avatar, ...updateData } = updateUserDto;

    // Kiểm tra user có tồn tại không
    const user = await this.userModel.findById(_id);
    if (!user) {
      throw new BadRequestException('User không tồn tại');
    }

    // Nếu không có avatar mới, giữ nguyên avatar cũ
    const updatedAvatar = avatar ? avatar : user.avatar;

    // Cập nhật thông tin user
    const result = await this.userModel.updateOne(
      { _id },
      { ...updateData, avatar: updatedAvatar }
    );

    if (result.modifiedCount === 0) {
      throw new BadRequestException('Cập nhật không thành công');
    }

    return {
      message: '✅ Cập nhật thành công!',
      avatar: updatedAvatar, // Chỉ lưu tên file ảnh
    };
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Not Found User';
    }
    return this.userModel.softDelete({ _id: id });
  }

  async updateUserToken(refreshToken: string, _id: string) {
    await this.userModel.updateOne({ _id }, { refreshToken });
  }
}
