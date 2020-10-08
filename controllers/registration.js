const bcrypt = require('bcrypt');
const user = require('../models/user');
const UserData = require('../models/user_data');
const UserCode = require('../models/user_code');
const send = require('../utils/SendEmail');
const random = require('random');
const { validationResult } = require('express-validator');


module.exports = (req, res) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.send(400, valid.errors[0]).end();
    else {
        user.findOne({ email: req.body.email }, function (err, result) {
            if (result) res.json(400, { "msg": "Email already exist" }).end(); else {
                const token = random.int(100000, 999999).toString();
                const User = new user({
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),

                });
                User.save(async function (err, doc) {
                    if (!err && doc) {
                        if (err) res.send(500, 'Try again').end(); else {
                            const user_code = new UserCode({ user_email: doc.email, code: token });
                            user_code.save();
                            const user_data = new UserData({ user_id: doc._id });
                            user_data.save();
                            result = await send(req.body.email, token);
                        }
                        if (!err && result === true) res.json(200, { msg: 'Please, check your email, for compconste your registration' }).end();
                        else res.send(500, 'Try again').end();
                    }
                })
            }

        })
    }
}