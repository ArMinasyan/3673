const route = require('express').Router();
const validation = require('../utils/validation');
const defender = require('../utils/defender');

//Controllers
const registration = require('../controllers/registartion');
const confirm = require('../controllers/confirmEmail');
const changePassword = require('../controllers/changePassword');
const getPoints = require('../controllers/getPoints');

//Sub Routes
route.post('/auth/registration', validation.reg_validation, registration);
route.post('/auth/confirm', validation.log_validation, confirm);

route.put('/user/changePassword', [validation.change_password, defender], changePassword);
route.post('/user/getPoints/:data', defender, getPoints);
module.exports = route;