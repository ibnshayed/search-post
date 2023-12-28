import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DataServices, PostEntity } from '../../repository';

@Injectable()
export class PostService {
  constructor(
    private readonly httpService: HttpService,
    private readonly db: DataServices,
  ) {}

  async searchPost(keyword: string) {
    const { data } = await this.httpService.axiosRef.get(
      'https://jsonplaceholder.typicode.com/posts',
    );

    const postData: PostEntity = await this.db.post.findOne({
      filter: {
        keyword,
      },
    });

    if (postData) {
      return postData.posts;
    }

    const matchedPost = data.filter(
      (post) => post.title.includes(keyword) || post.body.includes(keyword),
    );

    if (matchedPost.length) {
      await this.db.post.createOne({
        keyword,
        posts: matchedPost,
      });
    }

    return matchedPost;
  }
}
