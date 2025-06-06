import { videoMock } from "test/mocks/VideoMock";
import { VideoEntity } from "./Video";

describe(VideoEntity.name, () => {
  it("should create a video entity", () => {
    expect(videoMock.title).toBe("title")
    expect(videoMock.courseId).toBe("teste")
  })
})
