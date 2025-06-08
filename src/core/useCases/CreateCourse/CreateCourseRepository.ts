import { CourseEntity } from "core/entity/Course";

export interface CreateCourseRepository {
  create(course: CourseEntity): Promise<void>
  findByTitleAndUserId(title: string, courseId: string): Promise<CourseEntity>
}


