const createToken = require('../utils/createToken');
const User = require('../models/user');
const { validationResult } = require('express-validator');

module.exports = (req, res) => {
   // const valid = validationResult(req);
   // if (!valid.isEmpty()) res.send(valid.errors[0]);
    // else {
    User.findOne({ facebook_id: req.body.facebook_id }, function (err, result) {
        if (result) { } else {
            const newUser = new User({
                facebook_id: req.body.facebook_id
            });

            newUser.save().then(saved => {

            })
        }
    })
    // }
}