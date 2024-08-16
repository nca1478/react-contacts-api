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
        check('name').exists().withMessage('El nombre es requerido'),
        check('email').exists().withMessage('El email es requerido'),
        check('email').isEmail().normalizeEmail().withMessage('Debe ser un email válido'),
        check('email').custom(userExistsByEmail),
        check('password').exists().withMessage('Contraseña es requerida'),
        check('password')
            .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!"#$%&()=?¿*-_.:,;+^\\-`.+,/]{8,}$/)
            .withMessage('La contraseña debe contener al menos 8 caracteres y al menos 1 número'),
    ]
}

/**
 * Validate body request of get user endpoint (GET /users/:id)
 * @return	{Array}		Rules of validation (express-validator)
 */
const findByIdUserValidation = () => {
    return [
        check('id', 'No es un ID correcto de MongoDB').isMongoId(),
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
        check('name').exists().withMessage('El nombre es requerido'),
        check('email').exists().withMessage('El email es requerido'),
        check('email').isEmail().normalizeEmail().withMessage('Debe ser un email válido'),
        check('password').exists().withMessage('La contraseña es requerida'),
    ]
}

/**
 * Validate body request of login user endpoint (POST /users/login)
 * @return	{Array}		Rules of validation (express-validator)
 */
const loginUserValidation = () => {
    return [
        check('email').exists().withMessage('El email es requerido'),
        check('email').isEmail().normalizeEmail().withMessage('Debe ser un email válido'),
        check('password').exists().withMessage('La contraseña es requerida'),
    ]
}

/**
 * Validate body request of login user endpoint (POST /users/google)
 * @return	{Array}		Rules of validation (express-validator)
 */
const loginGoogleValidation = () => {
    return [check('tokenId').exists().withMessage('TokenID de Google es requerido')]
}

/**
 * Validate body request of login user endpoint (POST /users/facebook)
 * @return	{Array}		Rules of validation (express-validator)
 */
const loginFacebookValidation = () => {
    return [
        check('accessToken').exists().withMessage('AccessToken de Facebook es requerido'),
        check('userID').exists().withMessage('UserID de Facebook es requerido'),
    ]
}

/**
 * Validate body request of login user endpoint (POST /users/recovery)
 * @return	{Array}		Rules of validation (express-validator)
 */
const emailRecoveryValidation = () => {
    return [check('email').exists().withMessage('El email es requerido')]
}

/**
 * Validate body request of recovery password (POST /users/recovery/:token)
 * @return	{Array}		Rules of validation (express-validator)
 */
const recoveryPassValidation = () => {
    return [
        check('email').exists().withMessage('El email es requerido'),
        check('newPassword').exists().withMessage('Nueva contraseña es requerida'),
        check('newPassword')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!"#$%&()=?¿*-_.:,;+^\\-`.+,/]{8,}$/)
            .withMessage('La contraseña debe contener al menos 8 caracteres y al menos 1 número'),
    ]
}

module.exports = {
    createUserValidation,
    findByIdUserValidation,
    updateUserValidation,
    loginUserValidation,
    loginGoogleValidation,
    loginFacebookValidation,
    emailRecoveryValidation,
    recoveryPassValidation,
}
