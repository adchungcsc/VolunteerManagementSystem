const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
const compression = require('compression')
let cors = require('cors')
const http = require('http').createServer(express);
require('./auth');
require('dotenv').config();

const io = require('socket.io')(http, {
    cors: {
        origins: "*"
    // local:
        // origins: ['http://localhost:4200']
    // vm:
    //   origins: ['https://participance.eastus.cloudapp.azure.com']
    }
});

const port = process.env.PORT || 4200
// const port = process.env.PORT || 3000
const sessionSecret = process.env.SESSION_SECRET || 'cats'


const app = express()

app.use(compression());
let pageCount = 0;
let apiCount = 0;
let routes = [];

// to support JSON-encoded bodies
app.use(bodyParser.json({limit: '50mb'}));
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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
    io.emit('api call update', ++apiCount);
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

app.get('/auth/azureadoauth2', passport.authenticate('azure_ad_oauth2'), (req, res) => {
})


app.get('/callback',
    passport.authenticate('azure_ad_oauth2', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/find-event');
    }
);

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(JSON.stringify(req.user.user_id));
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

io.on('connection', (socket) => {
    io.emit('server uptime', process.uptime());
    io.emit('api call update', apiCount);
  
    io.emit('page count update', ++pageCount);
    
    socket.on('disconnect', () => {
      io.emit('page count update', --pageCount);
    });

    socket.on('route call update', (data) => {
        routes.push(data);
        io.emit('routes array update', routes);
    });
});
  
http.listen(3000, () => {
    console.log('listening on *:3000');
});

const users = require('./routes/users');
const event = require('./routes/events');
const attendance = require('./routes/attendance');
const signup = require('./routes/signup');

app.use('/user', users);
app.use('/attend', attendance);
app.use('/event', event);
app.use('/signup', signup);


// const path = require('path');
//
// // Migrate angular frontend off express and onto nginx server later.
// app.use(express.static(path.join(__dirname, 'static')));
//
// app.get('/*', async (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
// });


app.listen(port, function () {
    console.log('Listening on port ' + port)
})
