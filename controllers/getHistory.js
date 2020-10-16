const UserData = require('../models/user_data');

module.exports = (req, res, next) => {
    UserData.findOne({ user_id: res.locals.id }).then(doc => {
        if (doc) res.send(doc.history)
    })

}