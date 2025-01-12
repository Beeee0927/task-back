import * as mongoose from 'mongoose'
import { Connection } from 'mongoose'

export interface Task {
  userId: string
  title: string
  content: object
  contentHtml: string
  status: 'notFinished' | 'grading' | 'finished'
  answer: any[]
  mark: number
  comment: string
  deadline: string
  read: string[]
  deptName: 'frontEnd' | 'backEnd'
}

export const TaskSchema = new mongoose.Schema({
  userId: { type: String, default: '' },
  title: { type: String, default: '' },
  content: { type: Object, default: {} },
  contentHtml: { type: String, default: '' },
  status: { type: String, default: 'notFinished' },
  answer: { type: Array, default: [] },
  mark: { type: Number, default: 0 },
  comment: { type: String, default: '' },
  deadline: { type: String, default: '' },
  read: { type: Array, default: [] },
  deptName: { type: String, default: '' }
})

export const tasksProviders = [
  {
    provide: 'TASK_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Task', TaskSchema),
    inject: ['DATABASE_CONNECTION']
  }
]
