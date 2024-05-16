import { InMemoryUsersService } from '../../src/services/in-memory/in-memory-users'
import { it, expect } from 'vitest'

import { User } from '@prisma/client'

it('it must be possible to return list users', async () => {
  const usersRepository = new InMemoryUsersService()
  const users = await usersRepository.listUsers()

  expect(users).toBeInstanceOf(Array<User>)
  expect(users).toHaveLength(3)
})
