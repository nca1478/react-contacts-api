import bcrypt from 'bcryptjs'
import { updateOptions } from '../helpers/dbOptions'
import { googleVerify } from '../helpers/googleVerify'

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

    async loginUser(dataLogin) {
        const { email, password } = dataLogin

        try {
            const user = await this.user.findOne({ email, active: true })
            if (user) {
                let compare = bcrypt.compareSync(password, user.password)
                const userInfo = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    img: user.img,
                    google: user.google,
                    createdAt: user.createdAt,
                }
                if (compare) {
                    return userInfo
                } else {
                    return compare
                }
            } else {
                return user
            }
        } catch (err) {
            throw err
        }
    }

    async loginGoogle(tokenId) {
        try {
            const { email, name, img } = await googleVerify(tokenId)
            const user = await this.user.findOne({ email })
            if (!user) {
                const userInfo = {
                    name,
                    email,
                    password: ':P',
                    img,
                    google: true,
                }
                const result = await this.user.create(userInfo)
                return result
            } else {
                if (user.active) {
                    const userInfo = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        img: user.img,
                        google: user.google,
                        createdAt: user.createdAt,
                    }
                    return userInfo
                } else {
                    return null
                }
            }
        } catch (err) {
            throw err
        }
    }
}

export default UserService
