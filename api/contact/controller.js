// Helpers
import { responseError, responseGET, responsePOST } from '../helpers/response'

// Service
import ContactService from './service'

class ContactController extends ContactService {
    constructor(user) {
        super(user)
        this.error = new Error()
    }

    async create(req, res) {
        try {
            const dataContact = { ...req.body, user: req.user.id }
            const result = await this.createContact(dataContact)
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
            const userId = req.user.id
            const result = await this.findContacts(userId)
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
            const result = await this.findContactById(id)
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
            const result = await this.updateContact(id, req.body)
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
            const result = await this.deleteContact(id)
            const response = responsePOST(result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }
}

export default ContactController
