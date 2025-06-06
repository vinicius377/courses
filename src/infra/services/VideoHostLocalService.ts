import { VideoHostService } from "core/services/VideoHostService";
import { Readable } from "stream";
import fs from "fs"

export class VideoHostLocalService implements VideoHostService {

  upload(video: Readable, cb: () => void): void {
    const writable = fs.createWriteStream("test.mp4")
    video.pipe(writable)

    writable.on("finish", () => {
      cb()
    })
  }

}

export const videoHostService = new VideoHostLocalService()
