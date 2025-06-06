import { videoMock } from "test/mocks/VideoMock"
import { VideoRepositoryMock } from "test/mocks/VideoRepositoryMock"
import { UploadVideo } from "./UploadVideo"
import { VideoHostServiceMock } from "test/mocks/VideoHostService"

describe(UploadVideo.name, () => {
  let uploadVideo!: UploadVideo

  const repo = new VideoRepositoryMock()
  const videoHostService = new VideoHostServiceMock()
  
  const videoData = new ReadableStream()

  beforeEach(() => {
    uploadVideo = new UploadVideo(repo, videoHostService)
    vi.spyOn(uploadVideo, "execute")
  })

  it("should receive a video", () => {
    uploadVideo.execute({
      data: videoData,
      info: videoMock
    })

    expect(uploadVideo.execute).toBeCalledWith({
      data: videoData,
      info: videoMock
    })
  })

  it("should throw error if exist video with same title", async () => {
    vi.mocked(repo.findByTitleAndCourse).mockReturnValueOnce(Promise.resolve(videoMock))

    uploadVideo.execute({
      data: videoData,
      info: videoMock
    })

    expect(uploadVideo.execute).rejects.toThrow()
  })

  it("should not throw error if exist video with same title", async () => {
    vi.mocked(repo.findByTitleAndCourse).mockReturnValueOnce(null)

    await uploadVideo.execute({
      data: videoData,
      info: videoMock
    })

    expect(uploadVideo.execute).toHaveResolved()
  })

  it("should call upload video host service", async () => {
    await uploadVideo.execute({
      data: videoData,
      info: videoMock
    })

    expect(videoHostService.upload).toBeCalled()
  })
})
