import * as mongoose from 'mongoose'
import { Connection } from 'mongoose'

export interface Message {
  userId: string
  title: string
  content: string
  time: string
  read: boolean
}

export const MessageSchema = new mongoose.Schema({
  userId: { type: String, default: '' },
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  time: { type: String, default: '' },
  read: { type: Boolean, default: false }
})

export const messageProviders = [
  {
    provide: 'MESSAGE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Message', MessageSchema),
    inject: ['DATABASE_CONNECTION']
  }
]
