// Dependencies
import express from 'express'

import Contact from './model'
import ContactController from './controller'
import ContactRouter from './routes'

const router = express.Router()

// Injecting Dependencies
const contactController = new ContactController(Contact)
const contactRouter = new ContactRouter(router, contactController)
const contactRoutes = contactRouter.setRoutes()

export { contactRoutes }
