import bcrypt from 'bcryptjs'
import { updateOptions } from '../helpers/dbOptions'
import { googleVerify } from '../helpers/googleVerify'
import axios from 'axios'

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

    async updateUser(dataUser, password) {
        try {
            const user = await this.user.findOne({ id: dataUser.id })
            let compare = bcrypt.compareSync(password, user.password)
            if (compare) {
                const result = await this.user.findByIdAndUpdate(
                    dataUser.id,
                    dataUser,
                    updateOptions,
                )
                return result
            } else {
                return compare
            }
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

    setUserInfo = user => {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            img: user.img,
            google: user.google,
            facebook: user.facebook,
            createdAt: user.createdAt,
        }
    }

    async loginUser(dataLogin) {
        const { email, password } = dataLogin

        try {
            const user = await this.user.findOne({ email, active: true })
            if (user) {
                let compare = bcrypt.compareSync(password, user.password)
                const userInfo = this.setUserInfo(user)
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
                    facebook: false,
                }
                const result = await this.user.create(userInfo)
                return result
            } else {
                if (user.active) {
                    const userInfo = this.setUserInfo(user)
                    return userInfo
                } else {
                    return null
                }
            }
        } catch (err) {
            throw err
        }
    }

    async loginFacebook({ userID, accessToken }) {
        try {
            const urlGraphFacebook = `https://graph.facebook.com/${userID}?fields=id,name,email,picture&access_token=${accessToken}`
            const response = await axios.get(urlGraphFacebook)
            const facebookData = {
                email: response.data.email,
                name: response.data.name,
                img: response.data.picture.data.url,
            }

            const user = await this.user.findOne({ email: facebookData.email })
            if (!user) {
                const userInfo = {
                    name: facebookData.name,
                    email: facebookData.email,
                    password: ':P',
                    img: facebookData.img,
                    google: false,
                    facebook: true,
                }
                const result = await this.user.create(userInfo)
                return result
            } else {
                if (user.active) {
                    const userInfo = this.setUserInfo(user)
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
