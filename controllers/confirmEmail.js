const { validationResult } = require('express-validator');
const UserCode = require('../models/user_code');
const createToken = require('../utils/createToken');

module.exports = (req, res) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.status(400).send(valid.errors[0]).end(); else {

        UserCode.findOneAndDelete({ $and: [{ user_email: req.body.email }, { code: req.body.token }] }, function (err, doc) {
            if (doc) {
                const token = createToken({ id: doc._id, time: Date.now() });
                res.status(200).json({ 'token': token })
            } else res.status(400).json({ 'msg': "Invalid code" }).end();
        })
    }
}

