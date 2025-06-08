import { VideoEntity } from "core/entity/Video"

export interface UploadVideoRepository {
  create(video: VideoEntity): Promise<void>
  findByTitleAndCourse(title: string, courseId: string): Promise<VideoEntity | null>
}
