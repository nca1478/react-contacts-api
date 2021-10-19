// Dependencies
import { check, oneOf } from 'express-validator'

// Helpers
const { showValErrors } = require('../middlewares/showValErrors')
const { userExistsById, userExistsByState, userExistsByEmail } = require('../helpers/dbValidators')

/**
 * Validate body request of create admin endpoint (POST /users)
 * @return	{Array}		Rules of validation (express-validator)
 */
const createUserValidation = () => {
    return [
        check('name').exists().withMessage('Name is required'),
        check('email').exists().withMessage('Email is required'),
        check('email').isEmail().normalizeEmail().withMessage('Must be valid email'),
        check('email').custom(userExistsByEmail),
        check('password').exists().withMessage('Password is required'),
        check('password')
            .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!"#$%&()=?¿*-_.:,;+^\\-`.+,/]{8,}$/)
            .withMessage('Password should contain at least 8 characters and at least 1 number'),

        showValErrors,
    ]
}

/**
 * Validate body request of create admin endpoint (GET /users/:id)
 * @return	{Array}		Rules of validation (express-validator)
 */
const findByIdUserValidation = () => {
    return [
        check('id', 'Is not a mongoDB ID correct').isMongoId(),
        check('id').custom(userExistsById),
        check('id').custom(userExistsByState),
        showValErrors,
    ]
}

/**
 * Validate body request of login admin endpoint (POST /users/login)
 * @return	{Array}		Rules of validation (express-validator)
 */
const loginUserValidation = () => {
    return [
        check('email').exists().withMessage('Email is required'),
        check('email').isEmail().normalizeEmail().withMessage('Must be valid email'),
        check('password').exists().withMessage('Password is required'),
        showValErrors,
    ]
}

module.exports = {
    createUserValidation,
    findByIdUserValidation,
    loginUserValidation,
}
