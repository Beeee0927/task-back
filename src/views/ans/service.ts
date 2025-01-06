import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Ans } from 'src/db/modules/ans.providers'
import { Task } from 'src/db/modules/task.providers'
import { User } from 'src/db/modules/user.providers'
import { GridfsService } from 'src/views/gridfs/service'

@Injectable()
export class AnsService {
  constructor(
    @Inject('ANS_MODEL')
    private ansModel: Model<Ans>,
    @Inject('TASK_MODEL')
    private taskModel: Model<Task>,
    @Inject(GridfsService)
    private gridfsService: GridfsService
  ) {}

  async addAns(
    { _id: userId, deptName }: User,
    content: object,
    contentHtml: string,
    taskId: string,
    files: any[]
  ) {
    const ans = await this.ansModel.findOneAndUpdate(
      { userId, taskId },
      {
        taskId,
        userId,
        deptName,
        content,
        contentHtml,
        files: await this.gridfsService.uploadFiles(files)
      },
      { new: true, upsert: true }
    )

    await ans.save()

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
}
