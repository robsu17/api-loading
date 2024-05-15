import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePostDto } from 'src/Dto/posts/CreatePostDto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto, idUser: string) {
    return await this.prismaService.post.create({
      data: {
        title: createPostDto.title,
        description: createPostDto.description,
        type: createPostDto.type,
        userId: idUser,
      },
    })
  }

  async list(userId: string) {
    return await this.prismaService.post.findMany({
      where: {
        userId,
      },
    })
  }

  async findPostById(postId: string, userId: string) {
    const post = await this.prismaService.post.findFirst({
      where: {
        userId,
        id: postId,
      },
    })

    if (!post) {
      throw new NotFoundException({
        message: 'Post not found',
        statusCode: 401,
      })
    }

    return post
  }
}
