const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (data) => {
    return jwt.sign(data, fs.readFileSync('./keys/Private.key'), { algorithm: "RS512" });
}