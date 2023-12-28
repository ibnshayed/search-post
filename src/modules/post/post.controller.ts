import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../common';
import { PostService } from './post.service';

@Public()
@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('search')
  searchPost(@Query('keyword') keyword: string) {
    return this.postService.searchPost(keyword);
  }
}
