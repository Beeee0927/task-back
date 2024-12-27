import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { User } from 'src/db/modules/user.providers'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>
  ) {}

  async login(username: string, password: string, deptName: string) {
    const { _id: userId, role } =
      (await this.userModel.findOne({
        username,
        password,
        deptName
      })) ?? {}
    if (!userId) return { code: 1, message: '用户名或密码错误' }
    return { message: '登录成功', data: { userId, role, username } }
  }
}
