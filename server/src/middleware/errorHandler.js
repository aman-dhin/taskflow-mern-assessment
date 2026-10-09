import { AppError } from '../utils/AppError.js'
import { env } from '../config/env.js'

export function notFoundHandler(req, res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404))
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal server error'

  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join('; ')
  }

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400
    message = 'Invalid task id'
  }

  if (env.nodeEnv === 'development' && statusCode === 500) {
    console.error(err)
  }

  res.status(statusCode).json({
    message,
    ...(env.nodeEnv === 'development' && statusCode === 500 ? { stack: err.stack } : {}),
  })
}
