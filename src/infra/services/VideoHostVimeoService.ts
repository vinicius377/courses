import { VideoHostService } from "core/services/VideoHostService";
import { Readable } from "stream";
import { Vimeo } from "vimeo"

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

  upload(video: Readable, cb: () => void): void {
     console.log(video) 
  }

}

export const videoHostService = new VideoHostVimeoService()
