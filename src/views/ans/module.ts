import { Module } from '@nestjs/common'
import { AnsController } from './controller'
import { AnsService } from './service'
import { DatabaseModule } from 'src/db/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [AnsController],
  providers: [AnsService]
})
export class AnsModule {}
