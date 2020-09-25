let passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/facebook_login",
    profileFields: ['id', 'displayName', 'email']
},
    function (accessToken, refreshToken, profile, done) {
        console.log(accessToken, refreshToken, profile);
        // User.findOrCreate(..., function (err, user) {
        //     if (err) { return done(err); }
        //     done(null, user);
        // });
    }
));