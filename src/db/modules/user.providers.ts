import * as mongoose from 'mongoose'
import { Connection } from 'mongoose'

export interface User {
  _id: string
  username: string
  password: string
  role: 'admin' | 'user' | 'observer'
  avatar: string
  deptName: 'frontEnd' | 'backEnd'
}

export const UserSchema = new mongoose.Schema({
  username: { type: String, default: '' },
  password: { type: String, default: '' },
  role: {
    type: String,
    enum: ['admin', 'user', 'observer'],
    default: 'user'
  },
  avatar: { type: String, default: '' },
  deptName: {
    type: String,
    enum: ['frontEnd', 'backEnd'],
    default: 'frontEnd'
  }
})

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION']
  }
]
