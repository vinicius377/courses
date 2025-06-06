import { CourseRepository } from "core/repositories/CourseRepository";

export class CourseRepositoryMock implements CourseRepository {
  findByTitleAndUserId = vi.fn()
  create = vi.fn()
}
