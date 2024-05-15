import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common'
import { Request } from 'express'
import { CreatePostDto } from 'src/Dto/posts/CreatePostDto'
import { UpdatePostDto } from 'src/Dto/posts/UpdatePostDt'
import { ValidationPipe } from 'src/pipes/validator.pipe'
import { PostsService } from 'src/services/posts.service'

@Controller('/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/list')
  async list(@Req() req: Request, @Query() param: { page: number }) {
    const page = param.page
    const userId = req.user.id
    let posts

    if (!page) {
      posts = await this.postsService.list(userId)
    } else {
      posts = await this.postsService.listPaginate(page, userId)
    }

    return {
      items: posts.length,
      page,
      posts,
    }
  }

  @Get('/find/:postId')
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

  @Patch('/update/:postId')
  async update(
    @Param('postId') postId: string,
    @Body(new ValidationPipe())
    updatePostDto: UpdatePostDto,
    @Req() req: Request,
  ) {
    return this.postsService.updatePost(postId, req.user.id, updatePostDto)
  }

  @Delete('/delete/:postId')
  async destroy(@Param('postId') postId: string, @Req() req: Request) {
    return this.postsService.deletePost(postId, req.user.id)
  }
}
