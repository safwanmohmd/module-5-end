import express from 'express'
import { getUserById, login, register } from '../controllers/userController.js'

const router = express.Router()

router.post('/login',login)
router.get('/user/:id' , getUserById)
router.post('/register',register)

export default router