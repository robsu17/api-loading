import { NotFoundException } from '@nestjs/common'

export class EmailOrPasswordIsWrongException extends NotFoundException {
  constructor() {
    super({
      message: 'Email or password is wrong',
      statusCode: 401,
    })
  }
}
