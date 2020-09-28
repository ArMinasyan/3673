let { validationResult } = require('express-validator');
let user = require('../models/user');
let bcrypt = require('bcrypt');

module.exports = (req, res) => {
    let valid = validationResult(req);
    if (!valid.isEmpty()) res.send(valid.errors[0]); else
        user.findByIdAndUpdate(res.locals.id, { password: bcrypt.hashSync(req.body.new_password, 10) }, function (err, result) {
            if (result) res.json({ "msg": "Password successfully changed" });
            else if (err || !result) res.json({ 'msg': "Try again" });
        })
}