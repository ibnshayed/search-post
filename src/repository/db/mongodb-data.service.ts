import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PostEntity } from '../entities';
import { User } from '../schemas/user.schema';
import { DataServices } from './data-service.abastract';
import { GenericRepository } from './generic-repository.abstract';
import { MongoDBGenericRepository } from './mongodb-generic.repository';
import { Post } from '../schemas';

@Injectable()
export class MongoDBDataServices
  implements DataServices, OnApplicationBootstrap
{
  user: MongoDBGenericRepository<User>;
  post: GenericRepository<PostEntity>;

  constructor(
    @InjectModel(User.name)
    private UserRepository: PaginateModel<User>,
    @InjectModel(Post.name)
    private PostRepository: PaginateModel<Post>,
  ) {}

  onApplicationBootstrap() {
    this.user = new MongoDBGenericRepository<User>(this.UserRepository);
    this.post = new MongoDBGenericRepository<Post>(this.PostRepository);
  }
}
