let bcrypt = require('bcrypt');
let user = require('../models/user');
let send = require('../config/SendEmail');
let random = require('random');
let { validationResult } = require('express-validator');


module.exports = (req, res) => {
    let valid = validationResult(req);
    if (!valid.isEmpty()) res.send(400, valid.errors[0]).end();
    else {
        user.findOne({ email: req.body.email }, function (err, result) {
            if (result) res.json(400, { "msg": "Username already exist" }).end(); else {
                let token = random.int(100000, 999999).toString();
                let User = new user({
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    token: token
                });
                User.save(async function (err, doc) {
                    if (!err && doc) {
                        if (err) res.send(500, 'Try again').end(); else {
                            result = await send(req.body.email, token);
                        }
                        if (!err && result === true) res.json(200, { msg: 'Please, check your email, for complete your registration' }).end();
                        else res.send(500, 'Try again').end();
                    }
                })
            }

        })
    }
}