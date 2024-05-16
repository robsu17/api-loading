import { Prisma, User } from '@prisma/client'

export interface IUserService {
  findUserByEmail(email: string): Promise<User | null>
  createUser(data: Prisma.UserCreateInput): Promise<User>
  listUsers(): Promise<User[]>
}
