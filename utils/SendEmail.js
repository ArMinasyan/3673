const mailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_ID, "https://developers.google.com/oauthplayground");

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });



const send_mail = mailer.createTransport({
    service: 'gmail',
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: oauth2Client.getAccessTokenAsync
    }
});

const send = async (to, token) => {
    return new Promise((res, rej) => {
        send_mail.sendMail({
            from: process.env.EMAIL,
            to: to,
            html:
                '<p style="font-size: 16px; text-align: center;">Hi, dear user</p>' +
                '<p style="font-size: 16px; text-align: center;">This is your account confirmation code&nbsp;</p>' +
                '<p style="font-size: 18px; text-align: center;"><span style="color: #ff0000;"><strong>' + token + '</strong></span></p>' +
                '<p style="font-size: 16px; text-align: center;">Insert it in the appropriate input field, and press "Sign In" button again</p>',
            subject: 'Email Verification',
            generateTextFromHTML: true
        }, function (err, info) {
            if (err) console.log(err);
            if (info) {
                send_mail.close();
                res(true);
            }
        })
    })
}





module.exports = send;
