const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserModel',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    media: {
        public_id: {
            type: String,
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        },
    },
    backgroundColor: {
        type: String,
        default: "white"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("notesModel", notesSchema);