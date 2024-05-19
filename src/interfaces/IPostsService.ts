import { Post, Prisma } from '@prisma/client'

export interface IPostsService {
  findPostById(postId: string, userId: string): Promise<Post>
  list(userId: string): Promise<Post[]>
  listPaginate(page: number, take: number, userId: string): Promise<Post[]>
  create(post: Prisma.PostCreateInput, idUser: string): Promise<Post>
}
