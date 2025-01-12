import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/db/database.module'
import { UserController } from './user/controller'
import { TaskController } from './task/controller'
import { AnsController } from './ans/controller'
import { UserService } from './user/service'
import { TaskService } from './task/service'
import { AnsService } from './ans/service'
import { GridfsService } from './gridfs/service'
import { GridfsController } from './gridfs/controller'
import { MessageController } from './message/controller'
import { MessageService } from './message/service'

@Module({
  imports: [DatabaseModule],
  controllers: [
    GridfsController,
    UserController,
    TaskController,
    AnsController,
    MessageController
  ],
  providers: [
    UserService,
    TaskService,
    AnsService,
    GridfsService,
    MessageService
  ]
})
export class ViewsModule {}
