import { Inject, Injectable } from '@nestjs/common'
import { Model, mongo, Mongoose } from 'mongoose'
import { Ans } from 'src/db/modules/ans.providers'
import { Task } from 'src/db/modules/task.providers'
import { User } from 'src/db/modules/user.providers'

@Injectable()
export class AnsService {
  constructor(
    @Inject('ANS_MODEL')
    private ansModel: Model<Ans>,
    @Inject('TASK_MODEL')
    private taskModel: Model<Task>
  ) {}

  async addAns(
    { _id, deptName }: User,
    content: object,
    contentHtml: string,
    taskId: string,
    files: any[]
  ) {
    try {
      const ans = await this.ansModel.findOneAndUpdate(
        { userId: _id, taskId },
        {
          taskId,
          userId: _id,
          deptName,
          content,
          contentHtml,
          files
        },
        { new: true, upsert: true }
      )
      await ans.save()

      return { message: '提交成功，请等待批改' }
    } catch (error) {
      return { status: 400, message: '提交失败，附件可能过大，请重新上传' }
    }
  }

  async getAns({ _id }: User, taskId: string, userId?: string) {
    const ans = await await this.ansModel.findOne({
      userId: userId ?? _id,
      taskId
    })
    ans.files.forEach((file: any) => {
      file.base64 = (file.buffer as mongo.Binary).buffer
      file.blob = new Blob([file.base64], { type: file.mimetype })
      console.log(Blob.prototype)
      console.log(file.mimetype)
      console.log(file.base64 as Buffer)
      console.log(JSON.stringify(file.blob))
    })
    return { message: '获取成功', data: ans }
  }
}
