import { Post, Prisma } from '@prisma/client'

export interface IPostsService {
  findPostById(postId: string, userId: string): Promise<Post|null>
  list(userId: string): Promise<Post[]>
  listPaginate(page: number, take: number, userId: string): Promise<Post[]>
  create(post: Prisma.PostCreateInput, idUser: string): Promise<Post>
  deletePost(postId: string, userId: string): Promise<Post | null>
}
