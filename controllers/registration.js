const bcrypt = require('bcrypt');
const user = require('../models/user');
const UserData = require('../models/user_data');
const UserCode = require('../models/user_code');
const send = require('../utils/SendEmail');
const SecurePin = require('secure-pin');
const createToken = require('../utils/createToken');
const { validationResult } = require('express-validator');



module.exports = (req, res) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.status(400).send(valid.errors[0]).end();
    else {
        user.findOne({ email: req.body.email }, async function (err, result) {
            if (result) res.status(400).json({ "msg": "Email already exist" }).end(); else {
                const token = SecurePin.generatePinSync(6);
                const User = new user({
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),

                });
                User.save(async function (err, doc) {
                    if (!err && doc) {
                        if (err) res.status(500).send('Try again').end(); else {
                            //const user_code = new UserCode({ user_email: doc.email, code: token, user_id: doc._id });
                            //user_code.save();
                            const user_data = new UserData({ user_id: doc._id });
                            user_data.save();
                            const token = createToken({ id: doc._id, time: Date.now() });
                            res.status(200).json({ "token": token });
                            //result = await send(req.body.email, token);
                        }
                        // if (!err && result === true) res.status(200).json({ msg: 'Please, check your email, for complate your registration' }).end();

                    } else res.status(500).send('Try again').end();
                })
            }

        })
    }
}