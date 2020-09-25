let route = require('express').Router();
let user = require('../models/user');
let jwt = require('jsonwebtoken');
let fs = require('fs');
let path = require('path');
let bcrypt = require('bcrypt');
let valid = require('../config/validation');
let { validationResult } = require('express-validator');
route.post('/confirm', [valid.log_validation], function (req, res) {
    let vr = validationResult(req);
    if (!vr.isEmpty()) res.send(vr.errors[0]); else
    user.findOne({ email: req.body.email }, function (err, result) {
        if (result) {
            if (bcrypt.compareSync(req.body.password, result.password)) {

                user.findOneAndUpdate({ $and: [{ email: req.body.email }, { token: req.body.token }] }, { token: '-' }, function (err, doc) {
                    if (doc) {
                        let token = jwt.sign({ id: doc._id, time: Date.now() }, fs.readFileSync('./keys/Private.key'), { algorithm: "RS512" });
                        // res.cookie("token", token, {
                        //     sameSite: true,
                        //     httpOnly: true,
                        //     maxAge: 10 * 36000
                        // });

                        res.json({ 'token': token })
                    } else res.json({ 'msg': "Invalid code" });
                })
            } else res.json({ 'msg': "Invalid username and/or password" })

        } else res.json({ 'msg': "Invalid username and/or password" })
    })
})

module.exports = route;