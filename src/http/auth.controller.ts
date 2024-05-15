import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateUserDto } from 'src/Dto/auth/CreateUserDto'
import { ValidationPipe } from 'src/pipes/validator.pipe'

import { LoginUserDto } from 'src/Dto/auth/LoginUserDto'
import { AuthService } from 'src/services/auth.service'

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @HttpCode(201)
  async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto
    const user = await this.authService.signUp(username, email, password)
    return user
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body(new ValidationPipe()) loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto
    const accessToken = await this.authService.signIn(email, password)
    return accessToken
  }
}
