const { model, Schema, Types } = require('mongoose');

module.exports = model('user_code', new Schema({
    user_email: String,
    code: String,
    user_id: Types.ObjectId,
    // expireAt: {
    //     type: Date,
    //     default: Date.now,
    //     index: {
    //         expires: 600,
    //         background: true
    //     },

    // },
}))