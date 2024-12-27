import { Module } from '@nestjs/common'
import { UserModule } from './user/module'
import { DatabaseModule } from 'src/db/database.module'
import { TaskModule } from './task/module'

@Module({
  imports: [DatabaseModule, UserModule, TaskModule]
})
export class ViewsModule {}
