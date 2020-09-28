let createToken = require('../config/createToken');
let user = require('../models/user');
let bcrypt = require('bcrypt');
let { validationResult } = require('express-validator');

module.exports = (req, res) => {
    let valid = validationResult(req);
    if (!valid.isEmpty()) res.send(valid.errors[0]);
    else {
        user.findOne({ email: req.body.email }, function (err, result) {
            if (result) {
                bcrypt.compare(req.body.password, result.password, function (err, same) {
                    if (!err && same) {
                        if (result.token == '-') {
                            let token = createToken({ id: result._id, time: Date.now() });
                            res.json({ "token": token });
                        } else res.json({ 'msg': "Please, confirm your email for login ", "code": false })
                    } else res.json({ "msg": "Incorrect email and/or password" });
                })

            } else res.json({ "msg": "Incorrect email and/or password" });
        })
    }
}