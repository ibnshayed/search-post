import { Types } from 'mongoose';
import { GenderEnum, PermissionEnum, RoleEnum } from './../../common';

export interface UserEntity {
  _id?: Types.ObjectId;

  username: string;
  password: string;

  firstName: string;
  lastName: string;

  mobile: string;
  email: string;

  nid: string;
  address: string;

  role: RoleEnum;
  gender: GenderEnum;
  permissions: PermissionEnum[];

  resetToken?: boolean;
  status?: boolean;
}
