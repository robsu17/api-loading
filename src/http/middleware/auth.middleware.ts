import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response, NextFunction } from 'express'

declare module 'Express' {
  interface Request {
    user: {
      id: string
      email: string
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if (!authorization) {
      throw new UnauthorizedException({
        message: 'Token not provided',
        statusCode: 401,
      })
    }

    const token = authorization?.split(' ')[1]

    try {
      const payload = this.jwtService.verify(token, {
        secret: 'secret',
      })
      req.user = payload
      next()
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Invalid token',
        statusCode: 401,
      })
    }
  }
}
