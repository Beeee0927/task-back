import { Controller, Get, Param, Res } from '@nestjs/common'
import { GridfsService } from './service'
import type { Response } from 'express'

@Controller()
export class GridfsController {
  constructor(private readonly gridfsService: GridfsService) {}

  @Get('/download/:fileId')
  async downloadFile(@Param('fileId') fileId: string, @Res() res: Response) {
    const { filename, stream } = await this.gridfsService.downloadFile(fileId)
    if (!stream)
      return {
        status: 400,
        message: '文件不存在'
      }
    stream.pipe(res)
    return { filename }
  }
}
