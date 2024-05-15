import { ConflictException } from '@nestjs/common'

export class EmailAlreadyExistException extends ConflictException {
  constructor() {
    super({
      message: 'E-mail already exist',
      statusCode: 409,
    })
  }
}
