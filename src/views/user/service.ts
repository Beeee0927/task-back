import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { User } from 'src/db/modules/user.providers'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>
  ) {}

  async login(username: string, password: string) {
    const { _id: userId, role } =
      (await this.userModel.findOne({
        username,
        password
      })) ?? {}
    if (!userId) return { code: 1, message: '用户名或密码错误' }
    return { message: '登录成功', data: { userId, role, username } }
  }

  async getUsers({ deptName }: User) {
    const users = await this.userModel.find({ deptName, role: 'user' })
    return { message: '获取成功', data: users }
  }
}
