import { CourseEntity } from "core/entity/Course";

export interface CourseRepository {
  create(course: CourseEntity): Promise<void>
  findByTitleAndUserId(title: string, courseId: string): Promise<CourseEntity>
}
