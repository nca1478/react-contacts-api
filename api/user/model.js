const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['ADMIN_ROLE', 'USER_ROLE'],
            default: 'USER_ROLE',
        },
        img: {
            type: String,
            default: '',
        },
        google: {
            type: Boolean,
            default: false,
        },
        facebook: {
            type: Boolean,
            default: false,
        },
        tokenRecovery: {
            type: String,
            default: '',
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
)

// Remove __v and password on responses
userSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject()
    return user
}

export default mongoose.model('User', userSchema)
