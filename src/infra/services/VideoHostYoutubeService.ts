import { VideoHostService, VideoMetaData } from "core/services/VideoHostService";
import { Readable } from "stream";

export class VideoHostYoutubeService implements VideoHostService {
  upload(video: Readable, metadata: VideoMetaData): Promise<string> {
      
  }
}
