import { updateOptions } from '../helpers/dbOptions'

class UserService {
    constructor(user) {
        this.error = new Error()

        if (!user) {
            this.error.dependencyError = 'User Model is undefined'
            throw this.error.dependencyError
        } else {
            this.user = user
        }
    }

    async createUser(dataUser) {
        try {
            const result = await this.user.create(dataUser)
            return result
        } catch (err) {
            throw err
        }
    }

    async findUsers() {
        return this.user.find({ active: true })
    }

    async findUserById(id) {
        return this.user.findById(id)
    }

    async updateUser(id, dataUser) {
        try {
            const result = await this.user.findByIdAndUpdate(id, dataUser, updateOptions)
            return result
        } catch (err) {
            throw err
        }
    }

    async deleteUser(id) {
        try {
            const result = await this.user.findByIdAndUpdate(id, { active: false }, updateOptions)
            return result
        } catch (err) {
            throw err
        }
    }
}

export default UserService
