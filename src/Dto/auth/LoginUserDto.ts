import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({example: 'johndoe@example.com' })
  email: string = ''

  @IsString()
  @Length(6)
  @ApiProperty({example: '123456', minimum: 6 })
  password: string = ''
}
