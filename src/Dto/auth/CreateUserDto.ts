import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  username: string = ''

  @IsEmail()
  @ApiProperty({ example: 'johndoe@example.com' })
  email: string = ''

  @IsString()
  @Length(6)
  @ApiProperty({ example: '123456', minimum: 6 })
  password: string = ''
}
