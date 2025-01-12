import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { MessageService } from './service'

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/getMessage')
  async getMessage(@Req() { user }, @Body() { read }) {
    return this.messageService.getMessage(user, read)
  }

  @Post('/readMessage')
  async readMessage(@Body() { messageId }) {
    return this.messageService.readMessage(messageId)
  }

  @Post('/readAllMessage')
  async readAllMessage(@Req() { user }) {
    return this.messageService.readAllMessage(user)
  }
}
