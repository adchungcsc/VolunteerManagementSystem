const passport = require('passport');
const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2');
const jwt_decode = require( "jwt-decode");
const { models } = require('./orm');

require('dotenv').config();

const clientSecret = process.env.CLIENT_SECRET


passport.use(new AzureAdOAuth2Strategy({
        clientID: 'dcd1af31-45f0-43a4-9977-329f46129ba4',
        clientSecret: clientSecret,
        resource: '00000002-0000-0000-c000-000000000000',
        callbackURL: 'http://localhost:4200/callback',
        useCommonEndpoint: 'https://login.microsoftonline.com/common'
    },
    async function (request, accessToken, refreshToken, profile, done) {
        //Returns a JWT so get the email from it.
        const decoded = jwt_decode(request);
        console.log(request)
        console.log(decoded)
        console.log("email" + decoded.upn)
        const [user, created] = await models.users.findOrCreate({
            where: { email: decoded.upn },
            defaults: {
                name: decoded.name,
                role: "USER",
                phone_number: ""
            }
        });
        // console.log(user)
        // console.log(created)
        decoded.user_id = user.user_id
        return done(null, decoded);
    }));

passport.serializeUser(function (user, done) {
    // console.log("SERIALIZE USER" + JSON.stringify(user))
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    // console.log("DESERIALIZE USER" + JSON.stringify(user))
    done(null, user);
});
