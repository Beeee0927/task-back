import { MiddlewareConsumer, Module } from '@nestjs/common'
import { DatabaseModule } from './db/database.module'
import { ViewsModule } from './views/module'
import { AuthMiddleware } from './utils/auth.middleware'

@Module({
  imports: [DatabaseModule, ViewsModule]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
