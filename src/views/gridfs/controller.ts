import { Controller, Get, Param, Res } from '@nestjs/common'
import { GridfsService } from './service'
import type { Response } from 'express'

@Controller()
export class GridfsController {
  constructor(private readonly gridfsService: GridfsService) {}

  @Get('/download/:fileId')
  async downloadFile(@Param('fileId') fileId: string, @Res() res: Response) {
    const result = await this.gridfsService.downloadFile(fileId)
    if (!result.stream)
      return {
        status: 400,
        message: '文件不存在'
      }
    result.stream.pipe(res)
    return result
  }
}
