import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { GenderEnum, PermissionEnum, RoleEnum } from './../../../common';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  email: string;

  @IsString()
  nid: string;

  @IsString()
  address: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsEnum(PermissionEnum, { each: true })
  permissions: PermissionEnum[];
}
