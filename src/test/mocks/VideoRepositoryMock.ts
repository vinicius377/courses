import { VideoRepository } from "core/repositories/VideoReposioty";

export class VideoRepositoryMock implements VideoRepository {
  create = vi.fn()
  findByTitleAndCourse= vi.fn()
}
