import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'
import { usersProviders } from './modules/user.providers'
import { tasksProviders } from './modules/task.providers'

const providers = [...databaseProviders, ...usersProviders, ...tasksProviders]

@Module({
  providers: providers,
  exports: providers
})
export class DatabaseModule {}
