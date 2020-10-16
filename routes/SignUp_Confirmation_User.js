const route = require('express').Router();
const validation = require('../utils/validation');
const defender = require('../utils/defender');

//Controllers
const registration = require('../controllers/registration');
const confirm = require('../controllers/confirmEmail');
const changePassword = require('../controllers/changePassword');
const getPoints = require('../controllers/getPoints');
const deleteAccount = require('../controllers/deleteAccount');
const insertHistory = require('../controllers/insertHistory');
const getHistory = require('../controllers/getHistory');

//Sub Routes
route.post('/auth/registration', validation.reg_validation, registration);
route.post('/auth/confirm', validation.confirm_validation, confirm);

route.put('/user/changePassword', [validation.change_password, defender], changePassword);
route.delete('/user/deleteAccount', defender, deleteAccount);

route.get('/user/getPoints/:data', defender, getPoints);
route.post('/user/insertHistory', defender, insertHistory);
route.get('/user/getHistory', defender, getHistory);
module.exports = route;