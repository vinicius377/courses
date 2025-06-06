import { UploadVideo } from "core/useCases/UploadVideo/UploadVideo";
import { UploadVideoDto } from "core/useCases/UploadVideo/UploadVideoDto";
import { FastifyReply, FastifyRequest } from "fastify";
import { videoRepo } from "infra/repositories/VideoLocalRepository";
import { videoHostService } from "infra/services/VideoHostLocalService";

export const uploadVideo = new UploadVideo(videoRepo, videoHostService)

export class UploadVideoController {
  async execute(req: FastifyRequest<{ Body: UploadVideoDto }>, res: FastifyReply) {
    const file = await req.file()
    console.log(req.body)
    if (!file) return

    await uploadVideo.execute({
      data: file.file,
      info: {
        autor: "autor",
        description: "10",
        courseId: "12",
        title: "teste"
      }
    })
  }
}
