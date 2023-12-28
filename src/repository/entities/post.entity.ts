import { Types } from 'mongoose';

export interface PostEntity {
  _id?: Types.ObjectId;

  keyword: string;
  posts: object[];

  status?: boolean;
}
