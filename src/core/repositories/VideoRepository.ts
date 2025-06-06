import { VideoEntity } from "../entity/Video";

export interface VideoRepository {
  create(video: VideoEntity): Promise<void>
  findByTitleAndCourse(title: string, courseId: string): Promise<VideoEntity | null>
}
