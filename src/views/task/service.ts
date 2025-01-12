import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Ans } from 'src/db/modules/ans.providers'
import { Task } from 'src/db/modules/task.providers'
import { User } from 'src/db/modules/user.providers'
import { MessageService } from '../message/service'

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_MODEL')
    private taskModel: Model<Task>,
    @Inject('ANS_MODEL')
    private ansModel: Model<Ans>,
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    @Inject(MessageService)
    private messageService: MessageService
  ) {}

  async addTask(
    { deptName }: User,
    title: string,
    content: object,
    contentHtml: string,
    deadline: string
  ) {
    const task = await this.taskModel.create({
      deptName,
      title,
      content,
      contentHtml,
      deadline
    })

    const users = await this.userModel.find({ deptName, role: 'user' })
    users.forEach(async (user) => {
      await this.messageService.addMessage(
        user._id,
        '新任务发布',
        title + '：' + contentHtml.replace(/<[^>]*>/g, '')
      )
    })

    return { message: '数据插入成功', data: {} }
  }

  async getUserTaskList({ _id, deptName }: User, status: string) {
    // '待提交任务' / '批阅中任务' / '已完成任务'

    const myAnses = await this.ansModel.find({ userId: _id })

    const tasks = (
      await (async () => {
        if (status === '待提交任务') {
          const allTaskIds = myAnses.map((ans) => ans.taskId)
          const sendBackTaskIds = myAnses
            .filter((ans) => ans.status === 'sendBack')
            .map((ans) => ans.taskId)

          return await this.taskModel.find({
            deptName,
            $or: [
              { _id: { $nin: allTaskIds } },
              { _id: { $in: sendBackTaskIds } }
            ]
          })
        }

        if (status === '批阅中任务') {
          const gradingTaskIds = myAnses
            .filter((ans) => ans.status === 'grading')
            .map((ans) => ans.taskId)
          return await this.taskModel.find({
            deptName,
            _id: { $in: gradingTaskIds }
          })
        }

        if (status === '已完成任务') {
          const completedTaskIds = myAnses
            .filter((ans) => ans.status === 'completed')
            .map((ans) => ans.taskId)
          return await this.taskModel.find({
            deptName,
            _id: { $in: completedTaskIds }
          })
        }
      })()
    ).reverse()

    return {
      message: '数据获取成功',
      data: tasks
    }
  }

  async getAdminTaskList({ deptName }: User, status: string) {
    // '待批阅任务' / '已发布任务' / '已完成任务'
    // 有grading   / 无grading且非全completed   /  全completed

    const tasks = (
      await (async () => {
        const gradingTaskIds = await this.ansModel
          .find({
            deptName,
            status: 'grading'
          })
          .select('taskId')
          .distinct('taskId')

        const userCnt = await this.userModel
          .find({ deptName, role: 'user' })
          .countDocuments()

        const completedCntMap = (
          await this.ansModel
            .find({
              deptName,
              status: 'completed'
            })
            .select('taskId')
        ).reduce((map, cur) => {
          const id = cur.taskId.toString()
          map[id] ??= 0
          map[id]++
          return map
        }, {} as any)

        const completedTaskIds = []
        Object.entries(completedCntMap).forEach(([id, cnt]) => {
          if (cnt === userCnt) completedTaskIds.push(id)
        })

        if (status === '待批阅任务') {
          return await this.taskModel.find({
            deptName,
            _id: { $in: gradingTaskIds }
          })
        }

        if (status === '已发布任务') {
          return await this.taskModel.find({
            deptName,
            _id: { $nin: gradingTaskIds.concat(completedTaskIds) }
          })
        }

        if (status === '已完成任务') {
          return await this.taskModel.find({
            deptName,
            _id: { $in: completedTaskIds }
          })
        }
      })()
    )?.reverse()

    return { message: '数据获取成功', data: tasks }
  }

  async getTaskDetail(id: string) {
    const task = await this.taskModel.findById(id)
    return { message: '数据获取成功', data: task }
  }

  async updateTask(
    id: string,
    deptName: string,
    title: string,
    content: object,
    contentHtml: string,
    deadline: string
  ) {
    const task = await this.taskModel.findByIdAndUpdate(id, {
      deptName,
      title,
      content,
      contentHtml,
      deadline
    })
    if (!task) return { message: '找不到该数据', data: {} }
    return { message: '数据更新成功', data: {} }
  }
}
