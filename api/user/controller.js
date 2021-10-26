// Dependencies
import bcrypt from 'bcryptjs'

// Helpers
import { responseError, responseGET, responsePOST } from '../helpers/response'
import { sendTokenUser } from '../helpers/sendToken'

// Service
import UserService from './service'

class UserController extends UserService {
    constructor(user) {
        super(user)
        this.error = new Error()
    }

    async create(req, res) {
        try {
            const dataUser = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                role: req.body.role,
            }
            const result = await this.createUser(dataUser)
            const response = responsePOST(result)
            return res.status(201).json(response)
        } catch (err) {
            const error = responseError([err])
            console.log(error)
            res.status(500).json(error)
        }
    }

    async find(req, res) {
        try {
            const result = await this.findUsers()
            const response = responseGET(null, result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id
            const result = await this.findUserById(id)
            const response = responseGET(null, result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async findByIdAndUpdate(req, res) {
        try {
            const id = req.params.id
            const dataUser = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
            }
            const result = await this.updateUser(id, dataUser)
            const response = responsePOST(result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id
            const result = await this.deleteUser(id)
            const response = responsePOST(result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async login(req, res) {
        try {
            const dataLogin = {
                email: req.body.email,
                password: req.body.password,
            }
            let result = await this.loginUser(dataLogin)
            if (result) {
                const data = {
                    msg: 'Login Successfully.',
                    user: result,
                    token: sendTokenUser(result),
                }
                const response = responsePOST(data)
                return res.status(200).json(response)
            } else {
                if (result === null) {
                    const error = responseError({
                        msg: "The email doesn't exist or user is not active",
                    })
                    return res.status(404).json(error)
                } else {
                    const error = responseError({
                        msg: 'The combination of email and password does not exist',
                    })
                    return res.status(401).json(error)
                }
            }
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async google(req, res) {
        try {
            const tokenId = req.body.tokenId
            let result = await this.loginGoogle(tokenId)
            if (result) {
                const data = {
                    msg: 'Login Successfully.',
                    user: result,
                    token: sendTokenUser(result),
                }
                const response = responsePOST(data)
                return res.status(200).json(response)
            } else {
                const error = responseError({
                    msg: 'User is not active',
                })
                return res.status(404).json(error)
            }
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }
}

export default UserController
