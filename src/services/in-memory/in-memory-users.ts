import { User } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CreateUserDto } from 'src/Dto/auth/CreateUserDto'
import { IUserService } from 'src/interfaces/IUserService'

import { v4 as uuid } from 'uuid'

export class InMemoryUsersService implements IUserService {
  public users: User[] = [
    {
      id: uuid(),
      email: 'johndoe@gmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'john doe',
    },
    {
      id: uuid(),
      email: 'johnsnow@gmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'John Snow',
    },
    {
      id: uuid(),
      email: 'ironman@gmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'Tony Stark',
    },
  ]

  async findUserByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)
    return user ?? null
  }

  async createUser(data: CreateUserDto) {
    const user = {
      id: randomUUID(),
      username: data.username,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(user)

    return user
  }

  async listUsers() {
    return this.users
  }
}
