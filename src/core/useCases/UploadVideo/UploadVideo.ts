import { VideoHostService } from "core/services/VideoHostService";
import { VideoEntity } from "../../entity/Video";
import { UploadVideoDto } from "./UploadVideoDto";
import { ConflictException } from "infra/exceptions/ConflictException";
import { UploadVideoRepository } from "./UploadVideoRepository";

export class UploadVideo {
  constructor(
    private readonly videoRepo: UploadVideoRepository,
    private readonly videoHostService: VideoHostService
  ) { }

  public async execute(video: UploadVideoDto) {
    const videoInfo = new VideoEntity({
      description: video.info.description,
      author: video.info.author,
      courseId: video.info.courseId,
      title: video.info.author,
      sectionId: video.info.sectionId
    })
    await this.alreadyHaveVideoWithSameTitleAndCourseId(videoInfo)

    await this.videoHostService.upload(video.data, video.info)
    await this.saveVideoInfo(videoInfo)
  }

  private async alreadyHaveVideoWithSameTitleAndCourseId(video: VideoEntity) {
    const persistedVideo = await this.videoRepo.findByTitleAndCourse(
      video.title,
      video.courseId
    )

    if (persistedVideo) {
      throw new ConflictException({ error: "ALREADY_PERSISTED", message: "Titulo ja cadastrado para esse curso" })
    }
  }

  private async saveVideoInfo(video: VideoEntity) {
    await this.videoRepo.create(video)
  }
}
