const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (data) => {
    return jwt.sign(data, process.env.JWT_KEY, { algorithm: "HS512" });
}