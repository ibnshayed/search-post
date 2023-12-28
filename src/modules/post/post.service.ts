import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor() {}

  searchPost(keyword: string) {
    return 'searchPost';
  }
}
