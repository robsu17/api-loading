import { JwtService } from '@nestjs/jwt'
import { InMemoryAuthService } from '../../src/services/in-memory/in-memory-auth'
import { InMemoryUsersService } from '../../src/services/in-memory/in-memory-users'
import { describe, it, expect } from 'vitest'
import { EmailAlreadyExistException } from '../../src/http/errors/email-already-exit'
import { EmailNotRegisteredException } from '../../src/http/errors/email-not-registered'

const inMemoryAuthService = new InMemoryAuthService(
  new InMemoryUsersService(),
  new JwtService(),
)

describe('Authentication Tests', () => {
  it('It must be possible for the user to register', async () => {
    const data = {
      username: 'test',
      email: 'test@gmail.com',
      password: '123456',
    }

    const user = await inMemoryAuthService.signUp(
      data.username,
      data.email,
      data.password,
    )

    expect(user.id).toEqual(expect.any(String))
  })

  it('it must be possible for the user to log in', async () => {
    const data = {
      email: 'johndoe@gmail.com',
      password: '123456',
    }

    const { access_token: accessToken } = await inMemoryAuthService.signIn(
      data.email,
      data.password,
    )

    expect(accessToken).toEqual(expect.any(String))
  })

  it('It should not be possible to register a user with an registered email', async () => {
    const data = {
      username: 'test',
      email: 'test@gmail.com',
      password: '123456',
    }

    expect(
      async () =>
        await inMemoryAuthService.signUp(
          data.username,
          data.email,
          data.password,
        ),
    ).rejects.toBeInstanceOf(EmailAlreadyExistException)
  })

  it('It should not be possible to log in to a user with a non-existent email address', () => {
    const data = {
      email: 'notregisteredemail@gmail.com',
      password: '123456',
    }

    expect(
      async () => await inMemoryAuthService.signIn(data.email, data.password),
    ).rejects.toBeInstanceOf(EmailNotRegisteredException)
  })
})
