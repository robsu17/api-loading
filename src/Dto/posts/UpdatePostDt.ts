import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { Prisma } from '@prisma/client'

export class UpdatePostDto implements Prisma.PostCreateInput {
  @IsString()
  @ApiProperty({ example: 'title post' })
  title: string = ''

  @IsString()
  @ApiProperty({ example: 'post description' })
  description: string = ''

  @IsString()
  @ApiProperty({ example: 'post image' })
  image: string = ''

  @IsString()
  @ApiProperty({ example: 'post type' })
  type: string = ''

  user: Prisma.UserCreateNestedOneWithoutPostInput = {}
}
