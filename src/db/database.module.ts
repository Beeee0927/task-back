import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'
import { usersProviders } from './modules/user.providers'
import { tasksProviders } from './modules/task.providers'
import { ansProviders } from './modules/ans.providers'

const providers = [
  ...databaseProviders,
  ...usersProviders,
  ...tasksProviders,
  ...ansProviders
]

@Module({
  providers: providers,
  exports: providers
})
export class DatabaseModule {}
