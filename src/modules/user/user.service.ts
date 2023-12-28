import { Injectable } from '@nestjs/common';
import { DataServices } from './../../repository';
import { CreateUserDto, FindOneUserDto, PaginateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly db: DataServices) {}

  async create(createUserDto: CreateUserDto) {
    const user = {
      username: createUserDto.username,
      password: createUserDto.password,

      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,

      mobile: createUserDto.mobile,
      email: createUserDto.email,

      nid: createUserDto.nid,
      address: createUserDto.address,

      role: createUserDto.role,
      gender: createUserDto.gender,
      permissions: createUserDto.permissions,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = await this.db.user.createOne(user);
    return newUser;
  }

  async findAll(dto: PaginateUserDto) {
    const { page, limit } = dto;
    const data = await this.db.user.findManyWithPaginate(page, limit, {});
    return data;
  }

  findOne(dto: FindOneUserDto) {
    const { id } = dto;
    return this.db.user.findOne({
      filter: {
        _id: id,
      },
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
