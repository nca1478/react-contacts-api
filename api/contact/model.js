const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        job: {
            type: String,
        },
        phone1: {
            type: String,
        },
        phone2: {
            type: String,
        },
        celphone1: {
            type: String,
            required: true,
        },
        celphone2: {
            type: String,
        },
        address: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        website: {
            type: String,
        },
        active: {
            type: Boolean,
            default: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true },
)

contactSchema.methods.toJSON = function () {
    const { __v, ...contact } = this.toObject()
    return contact
}

var autoPopulate = function (next) {
    this.populate('user', 'name email role')
    next()
}

contactSchema.pre('findOne', autoPopulate).pre('find', autoPopulate)

export default mongoose.model('Contact', contactSchema)
