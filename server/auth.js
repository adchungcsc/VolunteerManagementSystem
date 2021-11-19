const passport = require('passport');
const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2');

passport.use(new AzureAdOAuth2Strategy({
        clientID: 'dcd1af31-45f0-43a4-9977-329f46129ba4',
        clientSecret: '',
        resource: '00000002-0000-0000-c000-000000000000',
        callbackURL: 'http://localhost:4200/callback',
        useCommonEndpoint: 'https://login.microsoftonline.com/common'
    },
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
