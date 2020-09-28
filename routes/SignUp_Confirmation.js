let route = require('express').Router();
let validation = require('../config/validation');
let registration = require('../controllers/registartion');
let confirm = require('../controllers/confirmEmail');


route.post('/registration', validation.reg_validation, registration);
route.post('/confirm', validation.log_validation, confirm);

module.exports = route;