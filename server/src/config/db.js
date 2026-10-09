import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDatabase() {
  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(env.mongodbUri)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection failed.')
    console.error(`URI host: ${maskUri(env.mongodbUri)}`)
    console.error(error.message)
    console.error(
      'Start a local MongoDB instance or set MONGODB_URI in server/.env (see .env.example).',
    )
    process.exit(1)
  }
}

function maskUri(uri) {
  try {
    const parsed = new URL(uri.replace('mongodb://', 'http://').replace('mongodb+srv://', 'https://'))
    return parsed.host
  } catch {
    return '(invalid URI)'
  }
}
