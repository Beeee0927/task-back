import { NestFactory } from '@nestjs/core'
import { ViewsModule } from './views/module'
import { ResponseInterceptor } from './interceptors/response.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(ViewsModule)
  app.enableCors()
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(8000)
}
bootstrap()
