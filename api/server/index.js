// Dependencies
import express from 'express'
import logger from 'morgan'
import chalk from 'chalk'
import cors from 'cors'

// Routes
import { userRoutes } from '../user'
import { contactRoutes } from '../contact'

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        // Database Connection
        require('../database')

        // Settings
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(
            logger(
                ':method :url :status :response-time ms - :res[content-length] [:date[clf]] :remote-addr',
            ),
        )

        // Bodyparser
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))

        // Static Files
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use('/api/v1/users', userRoutes)
        this.app.use('/api/v1/contacts', contactRoutes)
    }

    listen() {
        const port = process.env.PORT
        this.app.listen(port, () => {
            console.log(
                `${chalk.yellow('[contacts-api:REST]')} Servidor iniciado en puerto ${port}`,
            )
        })
    }
}

module.exports = Server
