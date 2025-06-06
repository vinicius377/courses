import { CourseEntity } from "core/entity/Course";
import { CourseRepository } from "core/repositories/CourseRepository";
import { BadRequestException } from "infra/exceptions/BadRequestException";
import { CreateCourseDto } from "./CreateCourseDto";

export class CreateCourse {
  constructor(
    private readonly courseRepo: CourseRepository
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
