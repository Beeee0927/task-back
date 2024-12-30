import * as mongoose from 'mongoose'
import { Connection } from 'mongoose'

export interface Ans {
  taskId: string
  userId: string
  deptName: 'frontEnd' | 'backEnd'
  content: object
  contentHtml: string
  files: any[]
  mark: number
  comment: string
  status: 'grading' | 'completed' | 'sendBack'
}

export const AnsSchema = new mongoose.Schema({
  taskId: { type: String, default: '' },
  userId: { type: String, default: '' },
  deptName: { type: String, default: '' },
  content: { type: Object, default: {} },
  contentHtml: { type: String, default: '' },
  files: { type: Array, default: [] },
  mark: { type: Number, default: 0 },
  comment: { type: String, default: '' },
  status: { type: String, default: 'grading' }
})

export const ansProviders = [
  {
    provide: 'ANS_MODEL',
    useFactory: (connection: Connection) => connection.model('Ans', AnsSchema),
    inject: ['DATABASE_CONNECTION']
  }
]
