const route = require('express').Router();
const valid = require('../utils/validation');

//Controllers
const emailAuth = require('../controllers/emailAuth');
const facebookAuth = require('../controllers/facebookAuth');

//Sub Routes
route.post('/auth/email', [valid.log_validation], emailAuth);
route.post('/auth/facebook', facebookAuth);



module.exports = route;