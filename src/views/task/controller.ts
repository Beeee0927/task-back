import { Body, Controller, Get, Post } from '@nestjs/common'
import { TaskService } from './service'

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/addTask')
  async addTask(@Body() { deptName, title, content, deadline }) {
    return this.taskService.addTask(deptName, title, content, deadline)
  }

  @Post('/getTaskList')
  async getTaskList(@Body() {}) {
    return this.taskService.getTaskList()
  }

  @Post('/getTaskDetail')
  async getTaskDetail(@Body() { id }) {
    return this.taskService.getTaskDetail(id)
  }
}
