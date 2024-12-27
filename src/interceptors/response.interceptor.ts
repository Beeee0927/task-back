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
        newRes.type('json')
        newRes.status(res.status ?? 200)
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
