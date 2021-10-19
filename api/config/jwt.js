export default {
    secret: process.env.SESSION_SECRET,
    expirationUser: { expiresIn: 60 * 60 * 24 * 1 }, // 1 days
    //expirationUser: { expiresIn: 60 }, // 60 days
    // expirationVerifyEmail: { expiresIn: 60 * 60 * 24 * 2 }, // 2 days
    // expirationRecoverPass: { expiresIn: 60 * 60 * 24 * 1 }, // 1 days
}
