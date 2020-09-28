let createToken = require('../config/createToken');
let User = require('../models/user');
let { validationResult } = require('express-validator');

module.exports = (req, res) => {
   // let valid = validationResult(req);
   // if (!valid.isEmpty()) res.send(valid.errors[0]);
    // else {
    User.findOne({ facebook_id: req.body.facebook_id }, function (err, result) {
        if (result) { } else {
            let newUser = new User({
                facebook_id: req.body.facebook_id
            });

            newUser.save().then(saved => {

            })
        }
    })
    // }
}