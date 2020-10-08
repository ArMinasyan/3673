const { validationResult } = require('express-validator');
const user_code = require('../models/user_code');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');

module.exports = (req, res) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.send(400, valid.errors[0]).end(); else {
        user_code.findOneAndUpdate({ $and: [{ user_email: req.body.email }, { code: req.body.token }] }, { code: '-' }, function (err, doc) {
            if (doc) {
                const token = createToken({ id: doc._id, time: Date.now() });
                res.json({ 'token': token })
            } else res.json(400, { 'msg': "Invalid code" }).end();
        })
    }
}

