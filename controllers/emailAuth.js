const createToken = require('../utils/createToken');
const user = require('../models/user');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports = (req, res) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.send(400, valid.errors[0]).end();
    else {
        user.findOne({ email: req.body.email }, function (err, result) {
            if (result) {
                bcrypt.compare(req.body.password, result.password, function (err, same) {
                    if (!err && same) {
                        if (result.token == '-') {
                            const token = createToken({ id: result._id, time: Date.now() });
                            res.json(200, { "token": token });
                        } else res.json(400, { 'msg': "Please, confirm your email for login ", "code": false })
                    } else res.json(400, { "msg": "Incorrect email and/or password" });
                })

            } else res.json(400, { "msg": "Incorrect email and/or password" });
        })
    }
}