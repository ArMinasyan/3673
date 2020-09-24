

let express = require('express'),
    bodyparser = require('body-parser'),
    cookieparser = require('cookie-parser'),
    cors = require('cors'),
    path = require('path'),
    mongoose = require('mongoose');

let app = express();


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieparser());

// let config;
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

    let sign_in = require('./routes/sign_in'),
        sign_up = require('./routes/sign_up'),
        confirm = require('./routes/confirm');

    app.use('/api', [sign_in, sign_up, confirm]);

    app.listen(process.env.PORT || 8000, function () {
        console.log('Start...');
    })
}


Start();