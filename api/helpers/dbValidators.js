import User from '../user/model'
import Contact from '../contact/model'

const userExistsById = async id => {
    const userExists = await User.findById(id)
    if (!userExists) {
        throw new Error(`User with ID ${id} does not exists`)
    }
}

const userExistsByState = async id => {
    const userExists = await User.findOne({ _id: id, active: true })
    if (!userExists) {
        throw new Error(`User with ID ${id} does not active`)
    }
}

const userExistsByEmail = async (email = '') => {
    const userExists = await User.findOne({ email })
    if (userExists) {
        throw new Error(`Email ${email} is already exists`)
    }
}

const contactExistsById = async id => {
    const contactExists = await Contact.findById(id)
    if (!contactExists) {
        throw new Error(`Contact with ID ${id} does not exists`)
    }
}

const contactExistsByState = async id => {
    const contactExists = await Contact.findOne({ _id: id, active: true })
    if (!contactExists) {
        throw new Error(`Contact with ID ${id} does not active`)
    }
}

module.exports = {
    userExistsById,
    userExistsByState,
    userExistsByEmail,
    contactExistsById,
    contactExistsByState,
}
