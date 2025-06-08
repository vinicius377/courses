import { CourseEntity } from "core/entity/Course";
import { BadRequestException } from "infra/exceptions/BadRequestException";
import { CreateCourseDto } from "./CreateCourseDto";
import { CreateCourseRepository } from "./CreateCourseRepository";

export class CreateCourse {
  constructor(
    private readonly courseRepo: CreateCourseRepository
  ) { }

  async execute(courseDto: CreateCourseDto) {
    const course = new CourseEntity({
      userId: courseDto.userId,
      title: courseDto.title,
      category: courseDto.category,
      description: courseDto.description
    })

    await this.alreadyHaveCourseWithSameTitleAndUserId(course)

    return this.courseRepo.create(course)
  }

  private async alreadyHaveCourseWithSameTitleAndUserId(course: CourseEntity) {
    const persistedCourse = await this.courseRepo.findByTitleAndUserId(course.title, course.userId)

    if (persistedCourse) {
      throw new BadRequestException({ error: "INVALID_TITLE", message: "Ja existe um curso com esse nome" })
    }
  }

}
