import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from './env'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { url } from 'inspector'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  const options = new DocumentBuilder()
    .setTitle('API Documentação')
    .setDescription('Documentação da API de manipulação de postagens e de usuários')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-documentation', app, document)

  await app.listen(env.PORT, () => {
    console.log(`🚀 HTTP SERVER RUNNING ON ${env.PORT}`)
  })
}
bootstrap()
