import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common'
import { AnsService } from './service'
import { FilesInterceptor } from '@nestjs/platform-express'

@Controller()
export class AnsController {
  constructor(private readonly ansService: AnsService) {}

  @Post('/addAns')
  @UseInterceptors(FilesInterceptor('files'))
  async addAns(
    @Req() { user },
    @Body() { content, contentHtml, taskId },
    @UploadedFiles() files
  ) {
    content = JSON.parse(content)
    contentHtml = JSON.parse(contentHtml)
    taskId = JSON.parse(taskId)
    return this.ansService.addAns(user, content, contentHtml, taskId, files)
  }

  @Post('/getAns')
  async getAns(@Req() { user }, @Body() { taskId, userId }) {
    return this.ansService.getAns(user, taskId, userId)
  }
}
