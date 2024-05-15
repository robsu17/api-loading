import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { AuthController } from './http/auth.controller'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from './services/users.service'
import { AuthService } from './services/auth.service'
import { PostsController } from './http/posts.controller'
import { PostsService } from './services/posts.service'
import { AuthMiddleware } from './http/middleware/auth.middleware'

@Module({
  controllers: [AuthController, PostsController],
  providers: [
    PrismaService,
    JwtService,
    UsersService,
    AuthService,
    PostsService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/posts/*')
  }
}
