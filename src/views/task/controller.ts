import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { TaskService } from './service'

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/addTask')
  async addTask(
    @Req() { user },
    @Body() { deptName, title, content, contentHtml, deadline }
  ) {
    return this.taskService.addTask(user, title, content, contentHtml, deadline)
  }

  @Post('/getTaskList')
  async getTaskList(@Req() { user }, @Body() { status }) {
    if (user.role === 'user')
      return this.taskService.getUserTaskList(user, status)
    return this.taskService.getAdminTaskList(user, status)
  }

  @Post('/getTaskDetail')
  async getTaskDetail(@Body() { id }) {
    return this.taskService.getTaskDetail(id)
  }

  @Post('/updateTask')
  async updateTask(
    @Body() { id, deptName, title, content, contentHtml, deadline }
  ) {
    return this.taskService.updateTask(
      id,
      deptName,
      title,
      content,
      contentHtml,
      deadline
    )
  }
}
