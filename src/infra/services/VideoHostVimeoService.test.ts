import { VideoHostVimeoService } from "./VideoHostVimeoService";
import fs from "fs"
import path from "path"

describe(VideoHostVimeoService.name, () => {
  const service = new VideoHostVimeoService()
  const videoPath = path.join(__dirname,"..", "..", "test", "mocks", "video_mock.mp4")
  const readable = fs.createReadStream(videoPath) 

  it("should upload", async () => {
    // TODO: 
    // service.upload(readable, () => {}) 
  })
})
