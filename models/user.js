const { model, Schema } = require('mongoose');

module.exports = model('user', new Schema({
    email: String,
    password: String,
    token: String,
    facebook_id: String
}))