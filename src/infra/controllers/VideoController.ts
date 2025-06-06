import { MultipartValue } from "@fastify/multipart";
import { UploadVideo } from "core/useCases/UploadVideo/UploadVideo";
import { UploadVideoDto } from "core/useCases/UploadVideo/UploadVideoDto";
import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequestException } from "infra/exceptions/BadRequestException";
import { videoRepo } from "infra/repositories/VideoLocalRepository";
import { videoHostService } from "infra/services/VideoHostLocalService";

export const uploadVideo = new UploadVideo(videoRepo, videoHostService)

export class UploadVideoController {
  async execute(req: FastifyRequest<{ Body: UploadVideoDto }>, res: FastifyReply) {
    const uploadData = await req.file()
    if (!uploadData) {
      throw new BadRequestException({ message: "Media nao valida", error: "INVALID_DATA"})
    }

    const info = uploadData.fields.info as MultipartValue<string>
    if (!info) {
      throw new BadRequestException({ message: "Informacoes nao validas", error: "INVALID_DATA"})
    }
    // TODO: make this auto
    const infoJson = JSON.parse(info.value)

    await uploadVideo.execute({
      data: uploadData.file,
      info: infoJson
    }
    )
  }
}
