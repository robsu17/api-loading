import { Injectable } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'
import { EmailNotRegisteredException } from 'src/http/errors/email-not-registered'
import { EmailOrPasswordIsWrongException } from 'src/http/errors/email-or-password-is-wrong'
import { EmailAlreadyExistException } from 'src/http/errors/email-already-exit'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, email: string, password: string) {
    const userWithSameEmail = await this.usersService.findUserByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyExistException()
    }

    return await this.usersService.createUser({ username, email, password })
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email)

    if (!user) {
      throw new EmailNotRegisteredException()
    }

    const isSamePassword = await bcrypt.compare(password, user?.password)

    if (!isSamePassword) {
      throw new EmailOrPasswordIsWrongException()
    }

    const payload = { id: user.id, email: user.email }

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: 'secret',
        expiresIn: '1hr',
      }),
    }
  }
}
