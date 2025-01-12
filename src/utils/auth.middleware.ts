import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { Model } from 'mongoose'
import { User } from 'src/db/modules/user.providers'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl === '/login' || req.originalUrl.startsWith('/download'))
      return next()

    const sessionId = req.headers.sessionid

    try {
      req.user = (await this.userModel.findOne({ sessionId })).toObject()
      if (!req.user) return res.status(401).json({ message: '登录验证失败' })
    } catch {
      return res.status(401).json({ message: '登录验证失败' })
    }

    next()
  }
}
