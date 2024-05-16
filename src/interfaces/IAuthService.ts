import { User } from '@prisma/client'

export interface IAuthService {
  signUp(username: string, email: string, password: string): Promise<User>
  signIn(email: string, password: string): Promise<{ access_token: string }>
}
