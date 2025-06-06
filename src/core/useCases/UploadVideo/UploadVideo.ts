import { VideoHostService } from "core/services/VideoHostService";
import { VideoEntity } from "../../entity/Video";
import { UploadVideoDto } from "./UploadVideoDto";
import { VideoRepository } from "core/repositories/VideoRepository";

export class UploadVideo {
  constructor(
    private readonly videoRepo: VideoRepository,
    private readonly videoHostService: VideoHostService
  ) { }

  public async execute(video: UploadVideoDto) {
    const videoInfo = new VideoEntity({
      description: video.info.description,
      autor: video.info.autor,
      courseId: "12",
      title: "asd",
    })
    await this.alreadyHaveVideoWithSameTitle(videoInfo)

    this.videoHostService.upload(video.data, () => this.saveVideoInfo(videoInfo))
  }

  private async alreadyHaveVideoWithSameTitle(video: VideoEntity) {
    const persistedVideo = await this.videoRepo.findByTitleAndCourse(
      video.title,
      video.courseId
    )

    return
    if (persistedVideo) {
      throw new Error()
    }
  }

  private async saveVideoInfo(video: VideoEntity) {
    await this.videoRepo.create(video)
  }
}
