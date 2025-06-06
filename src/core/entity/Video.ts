import { randomUUID } from "crypto";

export class VideoEntity {
  autor: string;
  courseId: string;
  description: string;
  title: string;
  id: string
  createdAt: Date;
  updatedAt: Date

  constructor(params: Omit<VideoEntity, "id" | "createdAt" | "updatedAt">) {
    Object.assign(this, params)
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.id = randomUUID()
  }
}
