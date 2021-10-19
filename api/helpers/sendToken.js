import jwt from 'jsonwebtoken'
import jwtConfig from '../config/jwt'

const sendTokenUser = user => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
    }

    return jwt.sign(payload, jwtConfig.secret, jwtConfig.expirationUser)
}

export { sendTokenUser }
