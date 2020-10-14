const User = require('../models/user');
const UserData = require('../models/user_data');
module.exports = (req, res, next) => {
    User.findByIdAndDelete(res.locals.id).then(doc => {
        if (doc) {
            UserData.findOneAndDelete({ user_id: doc._id }).then(doc => {
                res.status(200).send({ 'msg': 'Account successfuly deleted.' });
            })
        }
    })
}