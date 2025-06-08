import { VideoEntity } from "core/entity/Video";
import { VideoRepository } from "core/repositories/VideoRepository";
import { videoMock } from "test/mocks/entity/VideoMock";

export class VideoRepositoryLocal implements VideoRepository {
  async create(video: VideoEntity): Promise<void> {
  }

  async findByTitleAndCourse(title: string, courseId: string): Promise<VideoEntity> {
    return videoMock
  }
}

export const videoRepo = new VideoRepositoryLocal()
