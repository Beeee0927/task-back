import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { GridFSBucket, ObjectId } from 'mongodb'
import mongoose from 'mongoose'

@Injectable()
export class GridfsService {
  private bucket: GridFSBucket

  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly connection: typeof mongoose
  ) {
    const db = this.connection.connection.db
    this.bucket = new GridFSBucket(db)
  }

  async uploadFile(file: any) {
    const uploadStream = this.bucket.openUploadStream(file.originalname, {
      metadata: {
        mimetype: file.mimetype
      }
    })
    uploadStream.write(file.buffer)
    return uploadStream.end().id
  }

  async uploadFiles(files: any) {
    const fileIds = []
    for (const file of files) fileIds.push(await this.uploadFile(file))
    return fileIds
  }

  async downloadFile(fileId: string) {
    const file = (
      await this.bucket.find({ _id: new ObjectId(fileId) }).toArray()
    )?.[0]
    if (!file) return { filename: '', stream: null }
    return {
      filename: file.filename,
      mimetype: file.metadata.mimetype,
      stream: this.bucket.openDownloadStream(new ObjectId(fileId))
    }
  }
}
