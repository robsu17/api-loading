import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string = ''

  @IsEmail()
  email: string = ''

  @IsString()
  @Length(6)
  password: string = ''
}
