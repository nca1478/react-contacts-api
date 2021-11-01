// Validate Data
import { createContactValidation, findByIdContactValidation } from './validateData'

// Helpers
import { showValErrors } from '../middlewares/showValErrors'
import { verifyToken } from '../helpers/jwtHandler'

class ContactRouter {
    constructor(router, controller) {
        this.error = new Error()

        if (!router) {
            this.error.dependencyError = 'Express Router is undefined'
            throw this.error.dependencyError
        } else {
            this.router = router
        }

        if (!controller) {
            this.error.dependencyError = 'Controller is undefined'
            throw this.error.dependencyError
        } else {
            this.controller = controller
        }

        // Create Contact
        this.router.post(
            '/',
            [verifyToken, createContactValidation(), showValErrors],
            this.controller.create.bind(this.controller),
        )

        // Get Contacts
        this.router.get('/', [verifyToken], this.controller.find.bind(this.controller))

        // Count Contacts
        this.router.get('/count', [verifyToken], this.controller.count.bind(this.controller))

        // Get Contact by ID
        this.router.get(
            '/:id',
            [verifyToken, findByIdContactValidation(), showValErrors],
            this.controller.findById.bind(this.controller),
        )

        // Update Contact
        this.router.put(
            '/:id',
            [verifyToken, findByIdContactValidation(), createContactValidation(), showValErrors],
            this.controller.findByIdAndUpdate.bind(this.controller),
        )

        // Delete Contact
        this.router.delete(
            '/:id',
            [verifyToken, findByIdContactValidation(), showValErrors],
            this.controller.delete.bind(this.controller),
        )
    }

    setRoutes() {
        return this.router
    }
}

export default ContactRouter
