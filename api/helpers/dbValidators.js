import User from '../user/model'
import Contact from '../contact/model'

const userExistsById = async id => {
    const userExists = await User.findById(id)
    if (!userExists) {
        throw new Error(`Usuario con ID ${id} no existe`)
    }
}

const userExistsByState = async id => {
    const userExists = await User.findOne({ _id: id, active: true })
    if (!userExists) {
        throw new Error(`Usuario con ID ${id} no está activo`)
    }
}

const userExistsByEmail = async (email = '') => {
    const userExists = await User.findOne({ email })
    if (userExists) {
        throw new Error(`Email ${email} ya existe`)
    }
}

const contactExistsById = async id => {
    const contactExists = await Contact.findById(id)
    if (!contactExists) {
        throw new Error(`Contacto con ID ${id} no existe`)
    }
}

const contactExistsByState = async id => {
    const contactExists = await Contact.findOne({ _id: id, active: true })
    if (!contactExists) {
        throw new Error(`Contacto con ID ${id} no está activo`)
    }
}

module.exports = {
    userExistsById,
    userExistsByState,
    userExistsByEmail,
    contactExistsById,
    contactExistsByState,
}
