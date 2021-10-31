const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// to support JSON-encoded bodies
app.use(bodyParser.json());
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

let cors = require('cors')
app.use(cors())

const things = require('./routes/things');
const users = require('./routes/users');

const event = require('./routes/events')
const attendance = require('./routes/attendance')
const signup = require('./routes/signup')

app.use('/user', users);
app.use('/attendance', attendance);
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

// app.get('/', async (req, res) => {
//     //Health/sanity check endpoint
//     res.send('Hello World!')
//     const users = await models.users.findAll();
//     console.log("All users:", JSON.stringify(users, null, 2));
// })
//
app.listen(3000, function () {
    console.log('Listening on port 3000...')
})

// helloWorld().then(r => console.log("done"))
