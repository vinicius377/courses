import { randomUUID } from "crypto";

export class CourseSectionEntity {
  courseId: string;
  title: string;
  id: string
  createdAt: Date;
  updatedAt: Date

  constructor(params: Omit<CourseSectionEntity, "id" | "createdAt" | "updatedAt">) {
    Object.assign(this, params)
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.id = randomUUID()
  }
}
