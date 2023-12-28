/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/ban-types */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true, versionKey: false, minimize: false })
export class Post {
  @Prop({ type: String, trim: true, required: [true, 'Keyword is required!'] })
  keyword: string;

  @Prop({ type: [Object], required: true })
  posts: object[];

  @Prop({ type: Boolean, default: true })
  status: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
