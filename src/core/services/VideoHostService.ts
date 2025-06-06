import { Readable } from "stream";

export interface VideoMetaData {
  title: string
  description: string
}

export interface VideoHostService {
  upload(video: Readable, metadata: VideoMetaData): Promise<string>
}
