import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { Prisma } from '@prisma/client'

export class CreatePostDto implements Prisma.PostCreateInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'post title' })
  title: string = ''

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'post description' })
  description: string = ''

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'post type' })
  type: string = ''

  user: Prisma.UserCreateNestedOneWithoutPostInput = {}
}
