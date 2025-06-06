import { Readable } from "stream";

interface VideoDto {
  author: string
  description: string
  title: string;
  courseId: string
  sectionId: string
}

export interface UploadVideoDto {
  data: Readable;
  info: VideoDto 
}
