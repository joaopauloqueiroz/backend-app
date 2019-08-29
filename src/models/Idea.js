const { Schema, model } = require('mongoose')

const IdeaSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    emotion: {
        type: Boolean,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Idea',IdeaSchema)