const { validationResult } = require('express-validator');
const user = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.status(400).send(valid.errors[0]).end(); else
        user.findByIdAndUpdate(res.locals.id, { password: bcrypt.hashSync(req.body.new_password, 10) }, function (err, result) {
            if (result) res.status(200).json({ "msg": "Password successfully changed" }).end();
            else if (err || !result) res.status(500).json({ 'msg': "Try again" }).end();
        })
}