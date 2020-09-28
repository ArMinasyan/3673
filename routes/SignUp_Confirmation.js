let route = require('express').Router();
let validation = require('../config/validation');
let defender = require('../config/defender');

//Controllers
let registration = require('../controllers/registartion');
let confirm = require('../controllers/confirmEmail');
let changePassword = require('../controllers/changePassword');


//Sub Routes
route.post('/auth/registration', validation.reg_validation, registration);
route.post('/auth/confirm', validation.log_validation, confirm);
route.put('/user/changePassword', [validation.change_password, defender], changePassword);

module.exports = route;