import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { UserService } from './service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() { username, password }) {
    return this.userService.login(username, password)
  }

  @Post('/getUsers')
  async getUsers(@Req() { user }) {
    return this.userService.getUsers(user)
  }
}
