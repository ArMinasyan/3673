const { body } = require('express-validator');

const reg_validation = [
    body('email').trim().not().isEmpty().withMessage('Email field is required').isEmail().withMessage('Enter valid email address'),
    body('password').trim().not().isEmpty().withMessage('Password field is required'),
    body('confirm_password').trim().not().isEmpty().withMessage('Confirm password field is required').custom((val, { req }) => {
        if (val != req.body.password) throw new Error('Password confirmation does not match password');
        else return true
    })
]

const log_validation = [
    body('email').trim().not().isEmpty().withMessage('Email field is required').isEmail().withMessage('Enter valid email address'),
    body('password').trim().not().isEmpty().withMessage('Password field is required'),
]

const confirm_validation = [
    body('email').trim().not().isEmpty().withMessage('Email field is required').isEmail().withMessage('Enter valid email address'),
    body('token').trim().not().isEmpty().withMessage('Code field is required')
        .isNumeric().withMessage('Please enter only digits.')
        .isLength({ min: 6, max: 6 }).withMessage('Please enter only 6 digits.'),
]
const change_password = [
    body('new_password').trim().not().isEmpty().withMessage('New password field is required'),
    body('confirm_new_password').trim().not().isEmpty().withMessage('Confirm new password field is required').custom((val, { req }) => {
        if (val != req.body.new_password) throw new Error('Password confirmation does not match password');
        else return true
    })
]
module.exports = { reg_validation, log_validation, change_password, confirm_validation };