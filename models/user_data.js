const { model, Schema, Types } = require('mongoose');

module.exports = model('user_data', new Schema({
    user_id: {
        type: Types.ObjectId,
        ref: 'user'
    },
    data: [[]]
}))