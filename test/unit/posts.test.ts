import { randomUUID } from "crypto";
import { InMemoryPostsService } from "../../src/services/in-memory/in-memory-posts";
import { describe, it, expect } from "vitest";
import { Post } from "@prisma/client";

const inMemoryPostsService = new InMemoryPostsService()

describe('Posts Service Testing', () => {
  it('its must possible to create post', async () => {
    const postData = {
      title: 'title post test',
      description: 'description post test',
      type: 'news',
      userId: randomUUID()
    }

    const post = await inMemoryPostsService.create({
      title: postData.title,
      description: postData.description,
      type: postData.type,
      user: {
        connect: { id: postData.userId }
      }
    }, postData.userId)

    expect(post.id).toEqual(expect.any(String))
  })

  it('its must possible to list all posts', async () => {
    const post = await inMemoryPostsService.list('testingUserId')
    expect(post).toBeInstanceOf(Array<Post>)
  })

  it('its must possible to find post by id', async () => {

    const findPostData = {
      id: 'testingId',
      userId: 'testingUserId'
    }

    const post = await inMemoryPostsService.findPostById(findPostData.id, findPostData.userId)
    expect(post?.id).toEqual(findPostData.id)
  })

  it('its must possible to delet post by id', async () => {

    const findPostData = {
      id: 'testingId',
      userId: 'testingUserId'
    }

    const post = await inMemoryPostsService.deletePost(findPostData.id, findPostData.userId)
    expect(post?.id).toEqual(undefined)
  })
})