const route = require('express').Router();
const valid = require('../utils/validation');

//Controllers
const emailAuth = require('../controllers/emailAuth');

//Sub Routes
route.post('/auth/email', [valid.log_validation], emailAuth);



module.exports = route;