import { MiddlewareConsumer, Module } from '@nestjs/common'
import { UserModule } from './user/module'
import { DatabaseModule } from 'src/db/database.module'
import { TaskModule } from './task/module'
import { AuthMiddleware } from 'src/interceptors/auth.middleware'
import { AnsModule } from './ans/module'

@Module({
  imports: [DatabaseModule, UserModule, TaskModule, AnsModule]
})
export class ViewsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
