import { Task } from '../models/Task.js'
import { AppError } from '../utils/AppError.js'
import { serializeTask } from '../utils/taskSerializer.js'
import {
  validateCreateTaskBody,
  validateUpdateTaskBody,
} from '../utils/validateTaskBody.js'

export async function listTasks(req, res) {
  const tasks = await Task.find().sort({ updatedAt: -1 })
  res.json(tasks.map(serializeTask))
}

export async function getTaskById(req, res) {
  const task = await Task.findById(req.params.id)
  if (!task) {
    throw new AppError('Task not found', 404)
  }
  res.json(serializeTask(task))
}

export async function createTask(req, res) {
  const payload = validateCreateTaskBody(req.body)
  const task = await Task.create(payload)
  res.status(201).json(serializeTask(task))
}

export async function updateTask(req, res) {
  const updates = validateUpdateTaskBody(req.body)
  const task = await Task.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    throw new AppError('Task not found', 404)
  }
  res.json(serializeTask(task))
}

export async function deleteTask(req, res) {
  const task = await Task.findByIdAndDelete(req.params.id)
  if (!task) {
    throw new AppError('Task not found', 404)
  }
  res.status(204).send()
}
