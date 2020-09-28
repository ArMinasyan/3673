let route = require('express').Router();
let valid = require('../config/validation');

//Controllers
let emailAuth = require('../controllers/emailAuth');
let facebookAuth = require('../controllers/facebookAuth');

//Sub Routes
route.post('/auth/email', [valid.log_validation], emailAuth);
route.post('/auth/facebook', facebookAuth);



module.exports = route;