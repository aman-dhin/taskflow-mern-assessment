import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['todo', 'in_progress', 'review', 'done'],
      required: true,
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      required: true,
      default: 'medium',
    },
    dueDate: {
      type: Date,
      default: null,
    },
    assigneeId: {
      type: String,
      required: true,
      enum: ['user-1', 'user-2', 'user-3', 'user-4'],
    },
  },
  {
    timestamps: true,
  },
)

taskSchema.index({ updatedAt: -1 })

export const Task = mongoose.model('Task', taskSchema)
