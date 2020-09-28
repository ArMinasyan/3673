let { validationResult } = require('express-validator');
let user = require('../models/user');
let bcrypt = require('bcrypt');
let createToken = require('../config/createToken');

module.exports = (req, res) => {
    let valid = validationResult(req);
    if (!valid.isEmpty()) res.send(valid.errors[0]); else
        user.findOne({ email: req.body.email }, function (err, result) {
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    user.findOneAndUpdate({ $and: [{ email: req.body.email }, { token: req.body.token }] }, { token: '-' }, function (err, doc) {
                        if (doc) {
                            let token = createToken({ id: doc._id, time: Date.now() });
                            res.json({ 'token': token })
                        } else res.json({ 'msg': "Invalid code" });
                    })
                } else res.json({ 'msg': "Invalid username and/or password" })
            } else res.json({ 'msg': "Invalid username and/or password" })
        })
}