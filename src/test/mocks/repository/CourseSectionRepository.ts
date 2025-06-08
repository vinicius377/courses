import {CourseSectionRepository} from "core/repositories/CourseSectionRepository"

export class CourseSectionRepositoryMock implements CourseSectionRepository {
  findByTitleAndCourseId = vi.fn()
  create = vi.fn()
}
