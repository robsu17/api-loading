import { Injectable } from '@nestjs/common'
import { CreateUserDto } from 'src/Dto/auth/CreateUserDto'
import { PrismaService } from 'src/prisma/prisma.service'

import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    })
  }

  async createUser(user: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: await bcrypt.hash(user.password, 8),
      },
    })
  }

  async listUsers() {
    return await this.prisma.user.findMany()
  }
}
