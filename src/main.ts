import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResponseInterceptor } from './utils/response.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    exposedHeaders: '*'
  })
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(8000)
}
bootstrap()
