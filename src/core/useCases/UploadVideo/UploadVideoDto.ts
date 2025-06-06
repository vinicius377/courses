import { Readable } from "stream";

interface VideoDto {
  autor: string
  description: string
  title: string;
  courseId: string
}

export interface UploadVideoDto {
  data: Readable;
  info: VideoDto 
}
