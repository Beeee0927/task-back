import * as mongoose from 'mongoose'
import { Connection } from 'mongoose'
import { ObjectId } from 'mongoose'

export interface Ans {
  taskId: string
  userId: string
  deptName: 'frontEnd' | 'backEnd'
  content: object
  contentHtml: string
  files: ObjectId[]
  score: number
  comment: string
  status: undefined | 'grading' | 'finished'
}

export const AnsSchema = new mongoose.Schema({
  taskId: { type: String, default: '' },
  userId: { type: String, default: '' },
  deptName: { type: String, default: '' },
  content: { type: Object, default: {} },
  contentHtml: { type: String, default: '' },
  files: { type: Array, default: [] },
  score: { type: Number, default: -1 },
  comment: { type: String, default: '' },
  status: { type: String, default: undefined }
})

export const ansProviders = [
  {
    provide: 'ANS_MODEL',
    useFactory: (connection: Connection) => connection.model('Ans', AnsSchema),
    inject: ['DATABASE_CONNECTION']
  }
]
