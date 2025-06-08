import { courseSectionMock } from "test/mocks/entity/CourseSectionMock";
import { CreateCourseSection } from "./CreateCourseSection";
import { CourseSectionRepositoryMock } from "test/mocks/repository/CourseSectionRepository"

describe(CreateCourseSection.name, () => {
  let createCourseSection: CreateCourseSection
  const repo = new CourseSectionRepositoryMock()

  beforeEach(() => {
    createCourseSection = new CreateCourseSection(repo)
    vi.spyOn(createCourseSection, "execute")
  })

  it("should throw error if already has section with same title in course", async () => {
    try {
      await createCourseSection.execute(courseSectionMock)
    } catch{}

    expect(createCourseSection.execute).rejects.toThrow()
  })
})
