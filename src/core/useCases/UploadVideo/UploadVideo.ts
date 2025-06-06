import { VideoHostService } from "core/services/VideoHostService";
import { VideoEntity } from "../../entity/Video";
import { UploadVideoDto } from "./UploadVideoDto";
import { VideoRepository } from "core/repositories/VideoRepository";
import { BadRequestException } from "infra/exceptions/BadRequestException";
import { ConflictException } from "infra/exceptions/ConflictException";

export class UploadVideo {
  constructor(
    private readonly videoRepo: VideoRepository,
    private readonly videoHostService: VideoHostService
  ) { }

  public async execute(video: UploadVideoDto) {
    const videoInfo = new VideoEntity({
      description: video.info.description,
      author: video.info.author,
      courseId: video.info.courseId,
      title: video.info.author,
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
      throw new ConflictException({ error: "ALREADY_PERSISTED", message: "Titulo ja cadastrado para esse curso"})
    }
  }

  private async saveVideoInfo(video: VideoEntity) {
    await this.videoRepo.create(video)
  }
}
