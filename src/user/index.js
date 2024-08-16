// Dependencies
import express from 'express'

import User from './model'
import UserController from './controller'
import UserRouter from './routes'

const router = express.Router()

// Injecting Dependencies
const userController = new UserController(User)
const userRouter = new UserRouter(router, userController)
const userRoutes = userRouter.setRoutes()

export { userRoutes }
