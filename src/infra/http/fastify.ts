import "dotenv/config"
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";
import { UploadVideoController } from "infra/controllers/VideoController";

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  }
})
app.register(fastifyCors)
app.register(fastifyMultipart, { attachFieldsToBody: "keyValues", limits: { fileSize: 20 * 1024 * 1024 } })

const uploadVideoController = new UploadVideoController()
app.post(
  "/upload",
  {},
  uploadVideoController.execute
)

app.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
  console.log("server is listening")
})
