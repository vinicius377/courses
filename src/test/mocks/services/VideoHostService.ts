import { VideoHostService } from "core/services/VideoHostService";

export class VideoHostServiceMock implements VideoHostService{
  upload = vi.fn()
}
