import { CreateCourseSectionDto } from "./CreateCourseSectionDto";
import { ConflictException } from "infra/exceptions/ConflictException";
import { CourseSectionEntity } from "core/entity/CourseSection";
import { CreateCourseSectionRepository } from "./CreateCourseSectionRepository";

export class CreateCourseSection {
  constructor(
    private readonly courseSectionRepo: CreateCourseSectionRepository 
  ) {}
  async execute(courseSectionDto: CreateCourseSectionDto) {
    const courseSection = new CourseSectionEntity({
      courseId: courseSectionDto.courseId,
      title: courseSectionDto.title
    })
    await this.validateIfCourseAlreadyHasSectionWithSameTitle(courseSection.title, courseSection.courseId)

    await this.execute(courseSection)
  }

  private async validateIfCourseAlreadyHasSectionWithSameTitle(title: string, courseId:string) {
    const persistedCouseSection = await this.courseSectionRepo.findByTitleAndCourseId(title, courseId)
    
    if (persistedCouseSection) {
      throw new ConflictException({ error: "CONFLICT", message: "Ja existe uma secao com esse nome"})
    }
  }
}
