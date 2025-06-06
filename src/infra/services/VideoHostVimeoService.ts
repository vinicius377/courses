import { VideoHostService, VideoMetaData } from "core/services/VideoHostService";
import { Readable } from "stream";
import { Vimeo } from "@vimeo/vimeo"
import os from "os"
import fs from "fs/promises"
import path from "path";

export class VideoHostVimeoService implements VideoHostService {
  private readonly clientId = process.env.CLIENT_ID || ""
  private readonly clientSecret = process.env.CLIENT_SECRET || ""
  private readonly clientToken = process.env.CLIENT_TOKEN || ""
  private readonly client = new Vimeo(this.clientId, this.clientSecret, this.clientToken)

  constructor() {
    const envs = [this.clientId, this.clientToken, this.clientSecret]

    if (!envs.every(Boolean)) {
      throw new Error(`${VideoHostVimeoService.name}: missing env vars`)
    }
  }

  async upload(video: Readable, metadata: VideoMetaData): Promise<string> {
    const path = await this.filePath(video, metadata)
    return this.client.upload(
      path,
      { title: metadata.title, description: metadata.description },
    )
    return new Promise(res => res("teste"))
  }

  private async filePath(video: Readable, metadata: VideoMetaData) {
    const pathTmp = os.tmpdir()
    const pathFile = path.join(pathTmp, `${metadata.title}.mp4`)
    await fs.writeFile(pathFile, video)

    return pathFile
  }
}

export const videoHostService = new VideoHostVimeoService()
