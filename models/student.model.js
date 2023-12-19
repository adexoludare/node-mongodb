const mongoose = require('mongoose')

var studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This feild is required'
    },
    email: {
        type: String,
        required: 'This feild is required'
    },
    mobile: {
        type: Number,
        required: 'This feild is required'
    },city: {
        type: String,
        required: 'This feild is required'
    },
})

const Student = mongoose.model('Student', studentSchema);
module.exports = Student