import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const port = Number(process.env.PORT) || 5001
const mongodbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskflow'
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'

export const env = {
  port,
  mongodbUri,
  corsOrigin,
  nodeEnv: process.env.NODE_ENV || 'development',
}
