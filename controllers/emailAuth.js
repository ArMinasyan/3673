const createToken = require('../utils/createToken');
const user = require('../models/user');
const user_code = require('../models/user_code');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports = (req, res) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.status(400).send(valid.errors[0]).end();
    else {
        user.findOne({ email: req.body.email }, function (err, result) {
            if (result) {
                bcrypt.compare(req.body.password, result.password, function (err, same) {
                    if (!err && same) {
                        user_code.findOne({ user_email: req.body.email }, function (err, doc) {
                            if (doc.code === '-') {
                                const token = createToken({ id: result._id, time: Date.now() });
                                res.status(200).json({ "token": token });
                            } else res.status(400).json({ 'msg': "Please, confirm your email for login ", "code": false })
                        })
                    } else res.status(404).json({ "msg": "Incorrect email and/or password" });
                })

            } else res.status(404).json({ "msg": "Incorrect email and/or password" });
        })
    }
}