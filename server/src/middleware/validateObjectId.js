import mongoose from 'mongoose'
import { AppError } from '../utils/AppError.js'

export function validateObjectId(paramName = 'id') {
  return (req, res, next) => {
    const value = req.params[paramName]
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return next(new AppError('Invalid task id', 400))
    }
    next()
  }
}
