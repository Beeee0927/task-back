import { Module } from '@nestjs/common'
import { TaskController } from './controller'
import { TaskService } from './service'
import { DatabaseModule } from 'src/db/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
