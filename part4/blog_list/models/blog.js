const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    url: String,
    likes: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        String
    ]
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }

})

module.exports = mongoose.model('Blog', blogSchema)