import * as mongoose from 'mongoose'
import { Connection } from 'mongoose'

export interface Task {
  userId: string
  title: string
  content: string
  status: 'notFinished' | 'grading' | 'completed' | 'sendBack'
  answer: any[]
  mark: number
  comment: string
  deadline: string
  read: boolean
}

export const TaskSchema = new mongoose.Schema({
  userId: { type: String, default: '' },
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  status: { type: String, default: 'notFinished' },
  answer: { type: Array, default: [] },
  mark: { type: Number, default: 0 },
  comment: { type: String, default: '' },
  deadline: { type: String, default: '' },
  read: { type: Boolean, default: false }
})

export const tasksProviders = [
  {
    provide: 'TASK_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Task', TaskSchema),
    inject: ['DATABASE_CONNECTION']
  }
]
