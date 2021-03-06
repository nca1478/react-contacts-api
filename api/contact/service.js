import { updateOptions } from '../helpers/dbOptions'

class ContactService {
    constructor(contact) {
        this.error = new Error()

        if (!contact) {
            this.error.dependencyError = 'Contact Model is undefined'
            throw this.error.dependencyError
        } else {
            this.contact = contact
        }
    }

    async createContact(dataContact) {
        try {
            const result = await this.contact.create(dataContact)
            return result
        } catch (err) {
            throw err
        }
    }

    async findContacts(dataContact) {
        const { userId, limit, skip } = dataContact
        return this.contact
            .find({ active: true, user: userId })
            .sort('name')
            .limit(limit)
            .skip(skip)
    }

    async countContacts(userId) {
        return this.contact.countDocuments({ active: true, user: userId })
    }

    async findContactById(id) {
        return this.contact.findById(id)
    }

    async findContactsByName(userId, search) {
        const rgx = pattern => new RegExp(`.*${pattern}.*`)
        const searchRgx = rgx(search)
        return this.contact
            .find({ active: true, user: userId, name: { $regex: searchRgx, $options: 'i' } })
            .sort('name')
    }

    async updateContact(id, dataContact) {
        try {
            const result = await this.contact.findByIdAndUpdate(id, dataContact, updateOptions)
            return result
        } catch (err) {
            throw err
        }
    }

    async deleteContact(id) {
        try {
            const result = await this.contact.findByIdAndUpdate(
                id,
                { active: false },
                updateOptions,
            )
            return result
        } catch (err) {
            throw err
        }
    }
}

export default ContactService
