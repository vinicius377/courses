import { MultipartValue } from "@fastify/multipart";
import { UploadVideo } from "core/useCases/UploadVideo/UploadVideo";
import { UploadVideoDto } from "core/useCases/UploadVideo/UploadVideoDto";
import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequestException } from "infra/exceptions/BadRequestException";
import { videoRepo } from "infra/repositories/VideoLocalRepository";
import { videoHostService } from "infra/services/VideoHostVimeoService";

export const uploadVideo = new UploadVideo(videoRepo, videoHostService)

export class UploadVideoController {
  async execute(req: FastifyRequest<{ Body: UploadVideoDto }>, res: FastifyReply) {
    const uploadData = await this.validateFile(req)
    const info = this.validateInfo(uploadData?.fields.info as MultipartValue<string>)

    await uploadVideo.execute({
      data: uploadData!.file,
      info: info
    }
    )
    res.code(201).send({ ok: true })
  }

  private async validateFile(req: FastifyRequest<{ Body: UploadVideoDto }>) {
    const uploadData = await req.file()
    if (!uploadData) {
      throw new BadRequestException({ message: "Media nao valida", error: "INVALID_DATA" })
    }

    return uploadData
  }

  private validateInfo(info: MultipartValue<string>) {
    if (!info) {
      throw new BadRequestException({ message: "Informacoes nao validas", error: "INVALID_DATA" })
    }

    return JSON.parse(info.value)
  }
}
