const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    author: {
        type: String,
        trim: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})


const Book = mongoose.model('book', bookSchema)

module.exports = Book