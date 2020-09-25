let route = require('express').Router();
let passport = require('passport');
require('../config/facebook_passport');


route.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

route.get('/facebook_login', passport.authenticate('facebook'), function (req, res) {

    console.log()
})
module.exports = route;