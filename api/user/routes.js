// Validate Data
import { createUserValidation, findByIdUserValidation, loginUserValidation } from './validateData'

class UserRouter {
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

        // Create User
        this.router.post('/', createUserValidation(), this.controller.create.bind(this.controller))

        // Get Users
        this.router.get('/', this.controller.find.bind(this.controller))

        // Get User by ID
        this.router.get(
            '/:id',
            findByIdUserValidation(),
            this.controller.findById.bind(this.controller),
        )

        // Update User
        this.router.put(
            '/:id',
            createUserValidation(),
            this.controller.findByIdAndUpdate.bind(this.controller),
        )

        // Delete User
        this.router.delete(
            '/:id',
            findByIdUserValidation(),
            this.controller.delete.bind(this.controller),
        )

        // Login User
        this.router.post(
            '/login',
            loginUserValidation(),
            this.controller.login.bind(this.controller),
        )
    }

    setRoutes() {
        return this.router
    }
}

export default UserRouter
