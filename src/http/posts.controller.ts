import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { CreatePostDto } from 'src/Dto/posts/CreatePostDto'
import { ValidationPipe } from 'src/pipes/validator.pipe'
import { PostsService } from 'src/services/posts.service'

@Controller('/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/list')
  async list(@Req() req: Request) {
    const posts = await this.postsService.list(req.user.id)
    return {
      count: posts.length,
      posts,
    }
  }

  @Get('/:postId')
  async find(@Param('postId') postId: string, @Req() req: Request) {
    const post = await this.postsService.findPostById(postId, req.user.id)
    return post
  }

  @Post('/create')
  async store(
    @Body(new ValidationPipe()) createStorePost: CreatePostDto,
    @Req() req: Request,
  ) {
    const post = await this.postsService.create(createStorePost, req.user.id)
    return post
  }
}
