import { Readable } from "stream";

export interface VideoHostService {
  upload(video: Readable, cb: () => void): void
}
