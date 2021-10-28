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

app.use('/things', things);
app.use('/user', users);
app.use('/attendance', attendance);
app.use('/event', event);
app.use('/signup', signup);

app.get('/', (req, res) => {
    //Health/sanity check endpoint
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log('Listening on port 3000...')
})
