

const express = require('express'),
    bodyparser = require('body-parser'),
    cookieparser = require('cookie-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv');
const app = express();


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieparser());



dotenv.config();


let db;
if (process.env.NODE_ENV.trim() == 'development') db = 'mongodb://localhost:27017/3673';
else db = process.env.MONGODB




async function Start() {
    await mongoose.connect(db, {
        useNewUrlParser: true, useUnifiedTopology: true,
        useFindAndModify: false, useCreateIndex: true
        });

    const Email_Social_SignIn = require('./routes/Email_Social_SignIn'),
        SignUp_Confirmation_User = require('./routes/SignUp_Confirmation_User');

    app.use('/api', [Email_Social_SignIn, SignUp_Confirmation_User]);

    app.listen(process.env.PORT || 8000, function () {
        console.log('Start...');
    })
}


Start();