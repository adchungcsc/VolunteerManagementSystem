const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// to support JSON-encoded bodies
app.use(bodyParser.json());
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


const cookieParser = require("cookie-parser");
const sessions = require('express-session');

app.use(cookieParser());


const oneDay = 1000 * 60 * 60 * 24;

const sessionMiddleware = sessions({
    secret: "CHANGEMELATERWHENINPRODANDSETASENVIRONMENTVAR",
    saveUninitialized:true,
    cookie: {
        secure: false,
        domain: "localhost",
        maxAge: oneDay
//Placeholder until db conn setup
let events = [
    {
        event_id: 0,
        event_name: "NC State Event",
        event_location: "Talley Student Union",
        event_start: "26 Oct 2021 00:00:00 GMT",
        event_end: "28 Oct 2021 00:00:00 GMT",
        event_organizer: 0,
        event_max_volunteers: 5,
        event_description: "Come help out at NC State!",
        event_credit: 2,
        event_image: "https://brand.ncsu.edu/img/downloads/belltower-day-thumb.jpg"
    },
    {
        event_id: 1,
        event_name: "Test Event",
        event_location: "1600 Penn",
        event_start: "13 May 2021 00:00:00 GMT",
        event_end: "28 Jun 2021 00:00:00 GMT",
        event_organizer: 0,
        event_max_volunteers: 10,
        event_description: "Super cool event!",
        event_credit: 3,
        event_image: "https://media.istockphoto.com/photos/bigeyed-naughty-obese-cat-behind-the-desk-with-red-hat-grey-color-picture-id1199279669?b=1&k=20&m=1199279669&s=170667a&w=0&h=munUsqGIlDAmKK0ouS12nHCuzDdoDfvNalw_hHvh6Ls="
    },
    {
        event_id: 2,
        event_name: "Another event",
        event_location: "123 sesame",
        event_start: "14 May 2021 00:00:00 GMT",
        event_end: "23 Jun 2021 00:00:00 GMT",
        event_organizer: 0,
        event_max_volunteers: 10,
        event_description: "Super cool event!",
        event_credit: 8,
        event_image: "https://media.istockphoto.com/photos/bigeyed-naughty-obese-cat-behind-the-desk-with-red-hat-grey-color-picture-id1199279669?b=1&k=20&m=1199279669&s=170667a&w=0&h=munUsqGIlDAmKK0ouS12nHCuzDdoDfvNalw_hHvh6Ls="
    },
    resave: false
})

app.use(sessionMiddleware);


let cors = require('cors')
app.use(cors())
const { OAuth2Client } = require('google-auth-library');


//Attempted to swap out microsoft with simpler Google login prior to M1 demo but that didn't get working in time due to some shenanigans with express-session lib not properly setting cookie
//params even after they were set (my guess is that it had to do with difference in domains from lh:3k to lh:4200) but that needs more debugging. Spent a few hours on this and couldn't fix.
// Going to replace all of this auth and session handling with passportjs at a later date.
app.get('/googleLogin', (req, res) => {

    let token = req.query.idToken
    console.log(token)

    //not secret but change to env var later.
    const CLIENT_ID = "633268372118-5n6sf8p048fom0c04qs7rh0md0fdqql5.apps.googleusercontent.com"
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            console.log(userid)
            //Give a session.
            req.session.message = "Hello World!";
            req.session.user_id=userid;
            console.log("SET SESSION PROPERLY")
            console.log(req.session)
            console.log(payload)
        } catch (error) {
            console.log(error)
        }
    }
    verify().then(()=>{
        console.log("done")
    })
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.status(200).send({});
});


app.get('/test',(req,res) => {
    console.log(req.session)
    res.status(200).send({});
});


const users = require('./routes/users');
const event = require('./routes/events');
const attendance = require('./routes/attendance');
const signup = require('./routes/signup');

app.use('/user', users);
app.use('/attend', attendance);
app.use('/event', event);
app.use('/signup', signup);


// async function helloWorld() {
//     let item = await models.users.findAll();
//     console.log("All users:", JSON.stringify(item, null, 2));
//     item = await models.event.findAll();
//     console.log("All Events:", JSON.stringify(item, null, 2));
//     item = await models.event_signup.findAll();
//     console.log("All Event Signups:", JSON.stringify(item, null, 2));
//     item = await models.event_attendance.findAll();
//     console.log("All Event Attendances:", JSON.stringify(item, null, 2));
// }

app.get('/', async (req, res) => {
    //Health/sanity check endpoint
    res.send('Hello World!')
})


app.listen(3000, function () {
    console.log('Listening on port 3000...')
})

// helloWorld().then(r => console.log("done"))
