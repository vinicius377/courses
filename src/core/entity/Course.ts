import { randomUUID } from "crypto";

export class CourseEntity {
  description: string;
  category: string
  title: string;
  id: string
  userId: string
  createdAt: Date;
  updatedAt: Date

  constructor(params: Omit<CourseEntity, "id" | "createdAt" | "updatedAt">) {
    Object.assign(this, params)
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.id = randomUUID()
  }
}
