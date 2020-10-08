const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true
    },
    country: {
        type: String,
    },
    company_name: {
        type: String,
    }
});

const User = mongoose.model('user-document', userSchema)

module.exports = User