const jwt = require('jsonwebtoken');
const fs = require('fs');

const defender = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.JWT_KEY, function (err, decode) {
                if (err || !decode) res.send(401, 'Unauthorized');
                else {
                    res.locals.id = decode.id;
                    return next()
                }
            })
        }
    } else res.send(401, 'Unauthorized');
}

module.exports = defender;