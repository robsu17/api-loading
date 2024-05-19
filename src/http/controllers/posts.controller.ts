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
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger'

@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true })
@Controller('/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiQuery({ name: 'page', type: 'number', example: 1, required: false })
  @ApiQuery({ name: 'take', type: 'number', example: 10, required: false })
  @Get('/list')
  async list(
    @Req() req: Request,
    @Query() query: { page: string; take: string },
  ) {
    const page = Number(query.page)
    const take = Number(query.take)
    const userId = req.user.id
    let posts

    if (!page) {
      posts = await this.postsService.list(userId)
    } else {
      posts = await this.postsService.listPaginate(page, take, userId)
    }

    return {
      page,
      items: posts.length,
      posts,
    }
  }

  @Get('/find/:postId')
  async find(@Param('postId') postId: string, @Req() req: Request) {
    const post = await this.postsService.findPostById(postId, req.user.id)
    return post
  }

  @ApiBody({ type: CreatePostDto })
  @Post('/create')
  async store(
    @Body(new ValidationPipe()) createStorePost: CreatePostDto,
    @Req() req: Request,
  ) {
    return await this.postsService.create(createStorePost, req.user.id)
  }

  @ApiBody({ type: UpdatePostDto })
  @ApiParam({ name: 'postId' })
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
