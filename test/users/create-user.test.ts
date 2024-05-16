import { InMemoryUsersService } from '../../src/services/in-memory/in-memory-users'
import { it, expect } from 'vitest'

it('it must be possible to create user', async () => {
  const usersRepository = new InMemoryUsersService()

  const user = {
    username: 'johndoe123',
    email: 'johnjohn@gmail.com',
    password: '123456',
  }

  const userCreated = await usersRepository.createUser(user)

  expect(userCreated.id).toEqual(expect.any(String))
})
