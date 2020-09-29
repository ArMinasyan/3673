let { validationResult } = require('express-validator');
let user = require('../models/user');
let bcrypt = require('bcrypt');

module.exports = (req, res) => {
    let valid = validationResult(req);
    if (!valid.isEmpty()) res.send(400, valid.errors[0]).end(); else
        user.findByIdAndUpdate(res.locals.id, { password: bcrypt.hashSync(req.body.new_password, 10) }, function (err, result) {
            if (result) res.json(200, { "msg": "Password successfully changed" }).end();
            else if (err || !result) res.json(500, { 'msg': "Try again" }).end();
        })
}