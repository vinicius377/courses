import { CourseSectionEntity } from "core/entity/CourseSection"

export interface CreateCourseSectionRepository {
  findByTitleAndCourseId(title: string, courseId:string): Promise<CourseSectionEntity|null>
  create(courseSection: CourseSectionEntity): Promise<void>
}
