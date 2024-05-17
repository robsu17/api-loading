import { IAuthService } from 'src/interfaces/IAuthService'
import { InMemoryUsersService } from './in-memory-users'
import { EmailAlreadyExistException } from '../../http/errors/email-already-exit'
import { EmailNotRegisteredException } from '../..//http/errors/email-not-registered'
import { EmailOrPasswordIsWrongException } from '../..//http/errors/email-or-password-is-wrong'
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InMemoryAuthService implements IAuthService {
  constructor(
    private usersService: InMemoryUsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, email: string, password: string) {
    const userWithSameEmail = await this.usersService.findUserByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyExistException()
    }

    const user = await this.usersService.createUser({
      username,
      email,
      password,
    })

    return user
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email)

    if (!user) {
      throw new EmailNotRegisteredException()
    }

    const isSamePassword = user.password === password

    if (!isSamePassword) {
      throw new EmailOrPasswordIsWrongException()
    }

    const payload = { id: user.id, email: user.email }

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: 'test_key',
        expiresIn: '1hr',
      }),
    }
  }
}
