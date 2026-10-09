import { createApp } from './app.js'
import { connectDatabase } from './config/db.js'
import { env } from './config/env.js'

await connectDatabase()

const app = createApp()

app.listen(env.port, () => {
  console.log(`TaskFlow API listening on http://localhost:${env.port}`)
  console.log(`CORS origin: ${env.corsOrigin}`)
})
