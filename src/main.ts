import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await app.listen(env.PORT, () => {
    console.log(`🚀 HTTP SERVER RUNNING ON ${env.PORT}`)
  })
}
bootstrap()
