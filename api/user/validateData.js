// Dependencies
import { check, oneOf } from 'express-validator'

// Helpers
const { userExistsById, userExistsByState, userExistsByEmail } = require('../helpers/dbValidators')

/**
 * Validate body request of create user endpoint (POST /users)
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
    ]
}

/**
 * Validate body request of get user endpoint (GET /users/:id)
 * @return	{Array}		Rules of validation (express-validator)
 */
const findByIdUserValidation = () => {
    return [
        check('id', 'Is not a mongoDB ID correct').isMongoId(),
        check('id').custom(userExistsById),
        check('id').custom(userExistsByState),
    ]
}

/**
 * Validate body request of update user endpoint (PUT /users/:id)
 * @return	{Array}		Rules of validation (express-validator)
 */
const updateUserValidation = () => {
    return [
        check('name').exists().withMessage('Name is required'),
        check('email').exists().withMessage('Email is required'),
        check('email').isEmail().normalizeEmail().withMessage('Must be valid email'),
        check('password').exists().withMessage('Password is required'),
    ]
}

/**
 * Validate body request of login user endpoint (POST /users/login)
 * @return	{Array}		Rules of validation (express-validator)
 */
const loginUserValidation = () => {
    return [
        check('email').exists().withMessage('Email is required'),
        check('email').isEmail().normalizeEmail().withMessage('Must be valid email'),
        check('password').exists().withMessage('Password is required'),
    ]
}

/**
 * Validate body request of login user endpoint (POST /users/google)
 * @return	{Array}		Rules of validation (express-validator)
 */
const loginGoogleValidation = () => {
    return [check('tokenId').exists().withMessage('Google tokenId is required')]
}

/**
 * Validate body request of login user endpoint (POST /users/facebook)
 * @return	{Array}		Rules of validation (express-validator)
 */
const loginFacebookValidation = () => {
    return [
        check('accessToken').exists().withMessage('Facebook accessToken is required'),
        check('userID').exists().withMessage('Facebook userID is required'),
    ]
}

module.exports = {
    createUserValidation,
    findByIdUserValidation,
    updateUserValidation,
    loginUserValidation,
    loginGoogleValidation,
    loginFacebookValidation,
}
