import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Response } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res) => {
        const newRes = context.switchToHttp().getResponse() as Response

        newRes.status(res.status ?? 200)

        if (res.filename) {
          newRes.type('application/octet-stream')
          newRes.setHeader(
            'Content-Disposition',
            `inline; filename="${res.filename}"`
          )
          newRes.setHeader('filename', res.filename)

          return { message: '获取文件成功' }
        }

        newRes.type('json')
        return {
          code: res.code ?? 0,
          message:
            res.message ?? (res.status ?? 200 === 200 ? 'success' : 'failure'),
          data: res.data ?? {}
        }
      })
    )
  }
}
