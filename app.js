

const express = require('express'),
    bodyparser = require('body-parser'),
    cookieparser = require('cookie-parser'),
    cors = require('cors'),
    path = require('path'),
    mongoose = require('mongoose');

const app = express();


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieparser());

// const config;
// if (process.env.NODE_ENV.trim() == 'development') {
//     config = require('./config.json').development;
// } else config = require('./config.json').production

require('dotenv').config();


app.use(cors({
    origin: []
}))


async function Start() {
       await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    const Email_Social_SignIn = require('./routes/Email_Social_SignIn'),
        SignUp_Confirmation = require('./routes/SignUp_Confirmation');

    app.use('/api', [Email_Social_SignIn, SignUp_Confirmation]);

    app.listen(process.env.PORT || 8000, function () {
        console.log('Start...');
    })
}


Start();