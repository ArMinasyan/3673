let jwt = require('jsonwebtoken');
let fs = require('fs');

let defender = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, fs.readFileSync('./keys/Public.key'), function (err, decode) {
            if (err || !decode) res.send(false);
            else {
                res.locals.id = decode.id;
                return next()
            }
        })
    } else res.send(false);
}

module.exports = defender;