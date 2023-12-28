import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Private, Public } from '../../common';
import { CreateUserDto, FindOneUserDto, PaginateUserDto } from './dto';
import { UserService } from './user.service';

@ApiTags('user')
@Public()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create/one')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Private()
  @Post('paginate')
  findAll(@Body() dto: PaginateUserDto) {
    return this.userService.findAll(dto);
  }

  @Post('find/one')
  findOne(@Body() dto: FindOneUserDto) {
    return this.userService.findOne(dto);
  }

  // @Post('update/one')
  // update(@Body() dto: UpdateOneUserDto) {
  //   return this.userService.update(dto);
  // }

  // @Post('delete/one')
  // remove(@Body() dto: DeleteOneUserDto) {
  //   return this.userService.remove(dto);
  // }
}
