// Dependencies
import { check, oneOf } from 'express-validator'

// Helpers
import { isEmail, isURL } from '../helpers/utils'
import { contactExistsById, contactExistsByState } from '../helpers/dbValidators'

/**
 * Validate body request of create contact endpoint (POST /contacts)
 * @return	{Array}		Rules of validation (express-validator)
 */
const createContactValidation = () => {
    return [
        check('name').exists().withMessage('Name is required'),
        check('celphone1').exists().withMessage('Celphone1 is required'),
        check('address').exists().withMessage('Address is required'),
        check('email').custom(isEmail),
        check('website').custom(isURL),
    ]
}

/**
 * Validate body request of get contact endpoint (GET /contacts/:id)
 * @return	{Array}		Rules of validation (express-validator)
 */
const findByIdContactValidation = () => {
    return [
        check('id', 'Is not a mongoDB ID correct').isMongoId(),
        check('id').custom(contactExistsById),
        check('id').custom(contactExistsByState),
    ]
}

module.exports = {
    createContactValidation,
    findByIdContactValidation,
}
