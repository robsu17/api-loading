import { NotFoundException } from '@nestjs/common'

export class EmailNotRegisteredException extends NotFoundException {
  constructor() {
    super({
      message: 'Email not registered',
      statusCode: 400,
    })
  }
}
