import { courseMock } from "test/mocks/entity/CourseMock";
import { CreateCourse } from "./CreateCourse";
import { CourseRepositoryMock } from "test/mocks/repository/CourseRepositoryMock";

describe(CreateCourse.name, () => {
  let createCourse: CreateCourse

  const repo = new CourseRepositoryMock()

  beforeEach(() => {
    createCourse = new CreateCourse(repo)
    vi.spyOn(createCourse, "execute")
  })

  it("should throw error if already have course with same name and same user", async () => {
    vi.mocked(repo.findByTitleAndUserId).mockResolvedValueOnce(Promise.resolve(courseMock))
    try {
      await createCourse.execute(courseMock)
    } catch {}

    expect(createCourse.execute).rejects.toThrow()
  })

  it("should not throw error if already have course with same name and same user", async () => {
    vi.mocked(repo.findByTitleAndUserId).mockResolvedValueOnce(Promise.resolve(null))
    await createCourse.execute(courseMock)

    expect(createCourse.execute).rejects.toThrow()
  })

  it("should call create course repo", async () => {
    await createCourse.execute(courseMock)

    expect(repo.create).toHaveBeenCalled()
  })
})
