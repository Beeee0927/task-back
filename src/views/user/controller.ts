import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from './service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() { username, password, deptName }) {
    return this.userService.login(username, password, deptName)
  }
}
