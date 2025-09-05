import express from 'express'
import { createTask, deleteTaskById, editTaskById, getAllTasks, getMyTasks } from '../controllers/taskController.js'
import { isLogged } from '../middlewares/auth.js'
const router = express.Router()

router.get('/',isLogged,  getMyTasks)
router.post('/',isLogged, createTask)
router.patch('/:id', editTaskById)
router.delete('/:id', deleteTaskById)

export default router