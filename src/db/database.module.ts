import { Module } from '@nestjs/common'
import { usersProviders } from './modules/user.providers'
import { tasksProviders } from './modules/task.providers'
import { ansProviders } from './modules/ans.providers'
import * as mongoose from 'mongoose'
import { messageProviders } from './modules/message.providers'

const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost:27017/task')
  }
]

const providers = [
  ...databaseProviders,
  ...usersProviders,
  ...tasksProviders,
  ...ansProviders,
  ...messageProviders
]

@Module({
  providers: providers,
  exports: providers
})
export class DatabaseModule {}
