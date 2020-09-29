let { validationResult } = require('express-validator');
let user = require('../models/user');
let bcrypt = require('bcrypt');
let createToken = require('../config/createToken');

module.exports = (req, res) => {
    let valid = validationResult(req);
    if (!valid.isEmpty()) res.send(400, valid.errors[0]).end(); else
        user.findOne({ email: req.body.email }, function (err, result) {
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    user.findOneAndUpdate({ $and: [{ email: req.body.email }, { token: req.body.token }] }, { token: '-' }, function (err, doc) {
                        if (doc) {
                            let token = createToken({ id: doc._id, time: Date.now() });
                            res.json({ 'token': token })
                        } else res.json(400, { 'msg': "Invalid code" }).end();
                    })
                } else res.json(400, { 'msg': "Invalid username and/or password" }).end()
            } else res.json(400, { 'msg': "Invalid username and/or password" }).end()
        })
}