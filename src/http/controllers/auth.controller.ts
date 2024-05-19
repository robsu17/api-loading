import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateUserDto } from 'src/Dto/auth/CreateUserDto'
import { ValidationPipe } from 'src/pipes/validator.pipe'

import { LoginUserDto } from 'src/Dto/auth/LoginUserDto'
import { AuthService } from 'src/services/auth.service'
import { ApiBody } from '@nestjs/swagger'

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiBody({ type: CreateUserDto })
  @HttpCode(201)
  async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto
    return await this.authService.signUp(username, email, password)
  }

  @Post('/login')
  @ApiBody({ type: LoginUserDto })
  @HttpCode(200)
  async login(@Body(new ValidationPipe()) loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto
    return await this.authService.signIn(email, password)
  }
}
