let { model } = require('mongoose');

module.exports = model('user', {
    email: String,
    password: String,
    token: String,
    facebook_id: String
})