import { VideoHostService, VideoMetaData } from "core/services/VideoHostService";
import { Readable } from "stream";
import fs from "fs"

export class VideoHostLocalService implements VideoHostService {

  upload(video: Readable, metadata: VideoMetaData): Promise<string> {
    return new Promise<string>((res,rej) => {
      const writable = fs.createWriteStream("test.mp4")
      video.pipe(writable)

      writable.on("finish", () => {
        res("http://asdasd.com")
      })

      writable.on("error", () => {
        rej()
      })
    })
  }

}

export const videoHostService = new VideoHostLocalService()
