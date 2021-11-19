const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
let cors = require('cors')
require('./auth');
require('dotenv').config();


const port = process.env.PORT || 4200
const sessionSecret = process.env.SESSION_SECRET || 'cats'


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    }
));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "*",
    methods: ["GET", "DELETE", "PUT", "POST"],
}))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
});

function isLoggedIn(req, res, next) {
    console.log("CHECKING LOG IN STAT")
    req.user ? next() : res.sendStatus(401);
}

module.exports = {isLoggedIn}



app.get('/api/v1/auth/azureadoauth2', passport.authenticate('azure_ad_oauth2'), (req, res) => {
})


app.get('/callback',
    passport.authenticate('azure_ad_oauth2', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

app.get('/api/v1/protected', isLoggedIn, (req, res) => {
    res.send(JSON.stringify(req.user.user_id));
});

app.get('/api/v1/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

const users = require('./routes/users');
const event = require('./routes/events');
const attendance = require('./routes/attendance');
const signup = require('./routes/signup');

app.use('/api/v1/user', users);
app.use('/api/v1/attend', attendance);
app.use('/api/v1/event', event);
app.use('/api/v1/signup', signup);


const path = require('path');

// Migrate angular frontend off express and onto nginx server later.
app.use(express.static(path.join(__dirname, 'static')));

app.get('/*', async (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});


app.listen(port, function () {
    console.log('Listening on port ' + port)
})

