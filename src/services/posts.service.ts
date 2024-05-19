import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePostDto } from 'src/Dto/posts/CreatePostDto'
import { UpdatePostDto } from 'src/Dto/posts/UpdatePostDt'
import { PrismaService } from 'src/prisma/prisma.service'
import { IPostsService } from '../interfaces/IPostsService'

@Injectable()
export class PostsService implements IPostsService {
  constructor(private prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto, idUser: string) {
    return this.prismaService.post.create({
      data: {
        title: createPostDto.title,
        description: createPostDto.description,
        type: createPostDto.type,
        userId: idUser,
      },
    })
  }

  async list(userId: string) {
    return this.prismaService.post.findMany({
      where: {
        userId,
      },
    })
  }

  async listPaginate(page: number, take: number = 10, userId: string) {
    const itemsPerPage = take

    if (page <= 0) {
      return []
    }

    return this.prismaService.post.findMany({
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
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
        statusCode: 404,
      })
    }

    return post
  }

  async updatePost(
    postId: string,
    userId: string,
    updatePostDto: UpdatePostDto,
  ) {
    await this.findPostById(postId, userId)

    return this.prismaService.post.update({
      where: {
        id: postId,
        userId,
      },
      data: {
        title: updatePostDto.title,
        description: updatePostDto.description,
        image: updatePostDto.image,
        type: updatePostDto.type,
        updatedAt: new Date(),
      },
    })
  }

  async deletePost(postId: string, userId: string) {
    await this.findPostById(postId, userId)

    return this.prismaService.post.delete({
      where: {
        id: postId,
      },
    })
  }
}
