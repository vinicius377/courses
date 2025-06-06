import { videoMock } from "test/mocks/VideoMock";
import { VideoEntity } from "core/entity/Video";
import { VideoRepository } from "core/repositories/VideoRepository";

export class VideoRepositoryLocal implements VideoRepository {
  async create(video: VideoEntity): Promise<void> {
     console.log(video) 
  }

  async findByTitleAndCourse(title: string, courseId: string): Promise<VideoEntity> {
    return videoMock
  }
}

export const videoRepo = new VideoRepositoryLocal()
