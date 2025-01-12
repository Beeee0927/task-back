import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Ans } from 'src/db/modules/ans.providers'
import { Task } from 'src/db/modules/task.providers'
import { User } from 'src/db/modules/user.providers'
import { GridfsService } from 'src/views/gridfs/service'
import { MessageService } from '../message/service'

@Injectable()
export class AnsService {
  constructor(
    @Inject('ANS_MODEL')
    private ansModel: Model<Ans>,
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    @Inject('TASK_MODEL')
    private taskModel: Model<Task>,
    @Inject(GridfsService)
    private gridfsService: GridfsService,
    @Inject(MessageService)
    private messageService: MessageService
  ) {}

  async addAns(
    { _id: userId, deptName, username }: User,
    content: object,
    contentHtml: string,
    taskId: string,
    files: any[]
  ) {
    const oldAns = await this.ansModel.findOneAndUpdate(
      { userId, taskId },
      {
        taskId,
        userId,
        deptName,
        content,
        contentHtml,
        files: await this.gridfsService.uploadFiles(files),
        status: 'grading'
      },
      { upsert: true }
    )

    if (oldAns?.status !== 'grading') {
      const admins = await this.userModel.find({ deptName, role: 'admin' })
      const taskTitle = (await this.taskModel.findById(taskId)).title
      admins.forEach(async (admin) => {
        await this.messageService.addMessage(
          admin._id,
          '收到新答案',
          `${username}提交了${taskTitle}的答案，请及时批改`
        )
      })
    }

    return { message: '提交成功，请等待批改' }
  }

  async getAns({ _id }: User, taskId: string, userId?: string) {
    const ans = await await this.ansModel.findOne({
      userId: userId ?? _id,
      taskId
    })
    if (!ans) return { message: '暂无数据', code: 1 }
    return { message: '获取成功', data: ans }
  }

  async addReview(
    taskId: string,
    userId: string,
    score: number,
    comment: string
  ) {
    await this.ansModel.findOneAndUpdate(
      {
        taskId,
        userId
      },
      {
        score,
        comment,
        status: score >= 60 ? 'completed' : 'sendBack'
      }
    )

    const taskTitle = (await this.taskModel.findById(taskId)).title
    await this.messageService.addMessage(
      userId,
      '新批改结果',
      score >= 60
        ? `任务${taskTitle}的成绩为${score}分`
        : `任务${taskTitle}的成绩为${score}分，需重新提交`
    )

    return { message: '批改成功' }
  }
}
