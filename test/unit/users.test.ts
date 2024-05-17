import { User } from '@prisma/client'
import { InMemoryUsersService } from '../../src/services/in-memory/in-memory-users'
import { describe, it, expect } from 'vitest'

const usersService = new InMemoryUsersService()

describe('User Service Testing', () => {
  it('it must be possible to search for users by email', async () => {
    const email = 'johndoe@gmail.com'

    const user = await usersService.findUserByEmail(email)

    expect(user?.email).toBe(email)
  })

  it('it must be possible to return a list of all users', async () => {
    const allUsers = await usersService.listUsers()

    expect(allUsers).toBeInstanceOf(Array<User>)
    expect(allUsers).toHaveLength(3)
  })

  it('it must be possible to create a user', async () => {
    const newUser = {
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: '123456',
    }

    const user = await usersService.createUser(newUser)

    expect(user.id).toEqual(expect.any(String))
  })
})
