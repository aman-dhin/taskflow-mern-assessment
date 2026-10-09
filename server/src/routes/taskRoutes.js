import { Router } from 'express'
import {
  createTask,
  deleteTask,
  getTaskById,
  listTasks,
  updateTask,
} from '../controllers/taskController.js'
import { validateObjectId } from '../middleware/validateObjectId.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

router.get('/', asyncHandler(listTasks))
router.get('/:id', validateObjectId(), asyncHandler(getTaskById))
router.post('/', asyncHandler(createTask))
router.patch('/:id', validateObjectId(), asyncHandler(updateTask))
router.delete('/:id', validateObjectId(), asyncHandler(deleteTask))

export default router
