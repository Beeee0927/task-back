import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Task } from 'src/db/modules/task.providers'

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_MODEL')
    private taskModel: Model<Task>
  ) {}

  async addTask(
    deptName: string,
    title: string,
    content: string,
    deadline: string
  ) {
    const task = await this.taskModel.create({
      deptName,
      title,
      content,
      deadline
    })
    await task.save()
    return { message: '数据插入成功', data: {} }
  }

  async getTaskList() {
    const tasks = await this.taskModel.find()

    return {
      message: '数据获取成功',
      data: tasks
    }
  }

  async getTaskDetail(id: string) {
    const task = await this.taskModel.findById(id)
    return { message: '数据获取成功', data: task }
  }
}
