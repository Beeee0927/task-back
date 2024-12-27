import { Module } from '@nestjs/common'
import { UserController } from './controller'
import { UserService } from './service'
import { DatabaseModule } from 'src/db/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
