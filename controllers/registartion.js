let bcrypt = require('bcrypt');
let user = require('../models/user');
let send = require('../config/SendEmail');
let random = require('random');
let { validationResult } = require('express-validator');


module.exports = (req, res) => {
    let valid = validationResult(req);
    if (!valid.isEmpty()) res.send(valid.errors[0]);
    else {
        user.findOne({ email: req.body.email }, function (err, result) {
            if (result) res.json({ "msg": "Username already exist" }); else {
                let token = random.int(100000, 999999).toString();
                let User = new user({
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    token: token
                });
                User.save(async function (err, doc) {
                    if (!err && doc) {
                        if (err) res.status(501).end('Try again'); else {
                            result = await send(req.body.email, token);
                        }
                        if (!err && result === true) res.status(200).json({ msg: 'Please, check your email, for complete your registration' }).end();
                        else res.send('Try again').end();
                    }
                })
            }

        })
    }
}