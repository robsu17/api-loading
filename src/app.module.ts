import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { AuthController } from './http/auth.controller'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from './services/users.service'
import { AuthService } from './services/auth.service'
import { PostsController } from './http/posts.controller'
import { PostsService } from './services/posts.service'
import { AuthMiddleware } from './http/middleware/auth.middleware'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { InMemoryAuthService } from './services/in-memory/in-memory-auth'
import { InMemoryUsersService } from './services/in-memory/in-memory-users'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => {
        const envValidation = envSchema.safeParse(env)
        if (!envValidation.success) {
          console.error('Error env validation')
          throw new Error('Error env validation')
        }
        return envValidation
      },
    }),
  ],
  controllers: [AuthController, PostsController],
  providers: [
    PrismaService,
    JwtService,
    UsersService,
    AuthService,
    PostsService,
    InMemoryAuthService,
    InMemoryUsersService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/posts/*')
  }
}
