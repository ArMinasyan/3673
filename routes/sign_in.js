let route = require('express').Router();
let { validationResult } = require('express-validator');
let valid = require('../config/validation');
let jwt = require('jsonwebtoken');
let fs = require('fs');
let user = require('../models/user');
let bcrypt = require('bcrypt');

route.post('/login', [valid.log_validation], function (req, res) {
    let date = new Date();

    let vr = validationResult(req);
    if (!vr.isEmpty()) res.send(vr.errors[0]);
    else {
        user.findOne({ email: req.body.email }, function (err, result) {
            if (result) {
                bcrypt.compare(req.body.password, result.password, function (err, same) {
                    if (!err && same) {
                        if (result.token == '-') {
                            let token = jwt.sign({ id: result._id, time: Date.now() }, fs.readFileSync('./keys/Private.key'), { algorithm: "RS512" });
                            // res.cookie("token", token, {
                            //     sameSite: true,
                            //     httpOnly: true,
                            //     maxAge: 10 * 36000
                            // });
                            res.json({ "token": token });
                        } else res.json({ 'msg': "Please, confirm your email for login ", "code": false })
                    } else res.json({ "msg": "Incorrect email and/or password" });
                })

            } else res.json({ "msg": "Incorrect email and/or password" });
        })
    }
})



module.exports = route;