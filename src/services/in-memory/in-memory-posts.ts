import { Post, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { IPostsService } from "src/interfaces/IPostsService";

export class InMemoryPostsService implements IPostsService {
  private posts: Post[] = [
    {
      id: 'testingId',
      title: 'Programming is good',
      description: 'Hoje vamos falar de programação',
      type: 'divulgação',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'testingUserId'
    }
  ]
  
  async deletePost(postId: string, userId: string) {
    this.posts = this.posts.filter((post) => post.id !== postId && post.userId !== userId)
    return this.findPostById(postId, userId)
  }

  async findPostById(postId: string, userId: string) 
  {
    const post = this.posts.find(post => post.id === postId && post.userId === userId)
    return post ?? null
  }

  async list(userId: string)
  {
    const posts = this.posts
    return posts
  }

  async listPaginate(page: number, take: number, userId: string) 
  {
    const posts = this.posts
    return posts
  }

  async create(post: Prisma.PostCreateInput, idUser: string) 
  {

    const postAdd = {
      id: randomUUID(),
      title: post.title,
      description: post.description,
      type: post.type,
      image: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: idUser
    }

    const postCreated = this.posts.push()

    return postAdd
  }
}