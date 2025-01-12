import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Message } from 'src/db/modules/message.providers'
import { User } from 'src/db/modules/user.providers'

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE_MODEL')
    private messageModel: Model<Message>,
    @Inject('USER_MODEL')
    private userModel: Model<User>
  ) {}

  async getMessage({ _id }: User, read: boolean) {
    const messages = (
      await this.messageModel.find({ userId: _id, read })
    ).reverse()
    return { message: '查询成功', data: messages }
  }

  async readMessage(messageId: string) {
    const message = await this.messageModel.findByIdAndUpdate(messageId, {
      read: true
    })
    if (!message) return { status: 400, message: '消息不存在' }
    return { message: '已读成功' }
  }

  async readAllMessage({ _id }: User) {
    await this.messageModel.updateMany({ userId: _id }, { read: true })
    return { message: '已读成功' }
  }

  async addMessage(userId: string, title: string, content: string) {
    const user = await this.userModel.findById(userId)
    if (!user) return { message: '用户不存在' }

    const now = new Date()
    const time = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`

    const newMessage = await this.messageModel.create({
      userId,
      title,
      content,
      time,
      read: false
    })
    console.log(newMessage)
    return { message: '添加成功' }
  }
}
