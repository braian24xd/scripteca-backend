const mongoose = require('mongoose')
const PreregisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: String,
        required: true,
    },
    dateBorn: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('PreregisterSchema', PreregisterSchema)