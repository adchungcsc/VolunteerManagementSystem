const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// to support JSON-encoded bodies
app.use(bodyParser.json());
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

let cors = require('cors')
app.use(cors())


app.get('/', (req, res) => {
    //Health/sanity check endpoint
    res.send('Hello World!')
})

//TODO: Register new users

let users = [
    {
        user_id: 0,
        name: "John Cena",
        email: "JCena@ncsu.edu",
        phone_number: "911",
        role: "Administrator"
    },
    {
        user_id: 1,
        name: "Mark Zuckerberg",
        email: "mark@ncsu.edu",
        phone_number: "911",
        role: "User"
    }
]

let eventCounter = 2 //temp fill in for serial aut inc
/*
event_id: number;
  event_name: string;
  event_location: string;
  event_start: Date;
  event_end: Date;
  event_organizer: string
  event_organizer_email: string;
  event_max_volunteers: number;
  event_max_waitlist: number;
  event_description: string;
  event_credit: number;
  event_image: string;
 */

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
]

app.get('/user/:id?', (req, res) => {
    /**
     * Get a user based on ID
     */
    let queried_id = req.params.id
    if (queried_id === undefined) {
        res.send(users)
    } else {
        //Placeholder until db conn setup
        users.forEach(user => {
            console.log(user)
            console.log(user.user_id)
            console.log(queried_id)
            if (user.user_id === parseInt(queried_id)) {
                res.send(user)
            }
        })
        //Didn't find event
        res.status(404).send({})
    }
})

app.get('/event/:id?', (req, res) => {
    /**
     * Get all events
     */
        //TODO: Filter by date range/others
    let queried_id = req.params.id
    if (queried_id === undefined) {
        res.send(events)
    } else {
        //Placeholder until db conn setup
        events.forEach(event => {
            console.log(event)
            console.log(event.event_id)
            console.log(queried_id)
            if (event.event_id === parseInt(queried_id)) {
                res.send(event)
            }
        })
        //Didn't find event
        res.status(404).send({})
    }
})

app.post('/event', (req, res) => {
    /**
     * Create new event
     */
        //TODO: add error checking
        //TODO: link to existing user for organizer.
        // const addedEvent = {
        //         id: ++eventCounter,
        //         name: req.body.name,
        //         address: req.body.address,
        //         start_timestamp: req.body.start_timestamp,
        //         end_timestamp: req.body.end_timestamp,
        //         organizer_id: 0,
        //         max_volunteers: req.body.max_volunteers,
        //         description: req.body.description,
        //         image_path: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
        //     }
    const addedEvent = {
            event_id: 2,
            event_name: req.body.name,
            event_location: req.body.address,
            event_start: "14 May 2021 00:00:00 GMT",
            event_end: "23 Jun 2021 00:00:00 GMT",
            event_organizer: 0,
            event_max_volunteers: req.body.max_volunteers,
            event_description: req.body.description,
            event_credit: 8,
            event_image: "https://media.istockphoto.com/photos/bigeyed-naughty-obese-cat-behind-the-desk-with-red-hat-grey-color-picture-id1199279669?b=1&k=20&m=1199279669&s=170667a&w=0&h=munUsqGIlDAmKK0ouS12nHCuzDdoDfvNalw_hHvh6Ls="
        }
    events.push(addedEvent)
    res.status(201).send(addedEvent)
})

app.delete('/event/:id', (req, res) => {
    /**
     * delete event
     */
    let queried_id = req.params.id
    for (let i = 0; i < events.length; i++) {
        if (events[i].event_id === parseInt(queried_id)) {
            res.send(events[i])
            events.splice(i, 1)
        }
    }
    //found nothing
    res.status(404).send({})
})

let signupCounter = 3 //temp fill in for serial aut inc

let signups = [
    {
        event_signup_id: 1,
        event_id: 0,
        user_id: 0,
        is_waitlisted: false,
        waitlist_timestamp: null,
    },
    {
        event_signup_id: 2,
        event_id: 0,
        user_id: 1,
        is_waitlisted: false,
        waitlist_timestamp: null,
    },
    {
        event_signup_id: 3,
        event_id: 1,
        user_id: 1,
        is_waitlisted: false,
        waitlist_timestamp: null,
    },
]

//Signup for event

app.post('/signup', (req, res) => {
    /**
     * Create new event
     */
        //TODO: add error checking
        //TODO: link to existing user and event
    const eventSignup = {
            event_signup_id: ++signupCounter,
            event_id: req.body.event_id,
            user_id: req.body.user_id,
            is_waitlisted: false,
            waitlist_timestamp: null,
        }
    //Change to get user_id from their session instead of relying on them to tell us who they are.

    console.log(signups)

    signups.push(eventSignup)
    console.log(signups)
    res.send(eventSignup)
})

app.get('/signup/event/:id', (req, res) => {
    /**
     * Get who signed up for an event.
     */
    let signupsForThisEvent = []
    let queried_event_id = req.params.id
    signups.forEach(signup => {
        if (signup.event_id === parseInt(queried_event_id)) {
            signupsForThisEvent.push(signup)
        }
    })
    res.send(signupsForThisEvent)
})

app.get('/signup/user/:id', (req, res) => {
    /**
     * Get events that a user has signed up for.
     */
    let signupsForThisEvent = []
    let queried_user_id = req.params.id
    signups.forEach(signup => {
        if (signup.user_id === parseInt(queried_user_id)) {
            signupsForThisEvent.push(signup)
        }
    })
    res.send(signupsForThisEvent)
})


//Register attendance for event.

let attendanceCounter = 1 //temp fill in for serial aut inc

let attendances = [
    {
        event_attendance_id: 1,
        event_id: 1,
        hours: 1,
        comment: "Event was great",
        rating: 5,
        attendee_id: 1
    }
]

app.post('/attend', (req, res) => {
    /**
     * Create new event
     */
        //TODO: add error checking
        //TODO: link to existing user and event
    const eventAttendance = {
            event_attendance_id: ++attendanceCounter,
            event_id: req.body.event_id,
            hours: req.body.hours,
            comment: req.body.comment,
            rating: req.body.rating,
            attendee_id: req.body.attendee_id
        }
    //Change to get attendee_id from their session instead of relying on them to tell us who they are.

    attendances.push(eventAttendance)
    res.send(eventAttendance)
})

app.get('/attend/event/:id', (req, res) => {
    /**
     * Get who attended an event
     */
    let attendancesForThisEvent = []
    let queried_event_id = req.params.id
    attendances.forEach(attendance => {
        if (attendance.event_id === parseInt(queried_event_id)) {
            attendancesForThisEvent.push(attendance)
        }
    })
    res.send(attendancesForThisEvent)
})

app.get('/attend/user/:id', (req, res) => {
    /**
     * Get event attendances a user has registered attendance for.
     */
    let attendancesForThisEvent = []
    let queried_user_id = req.params.id
    attendances.forEach(attendance => {
        if (attendance.attendee_id === parseInt(queried_user_id)) {
            attendancesForThisEvent.push(attendance)
        }
    })
    res.send(attendancesForThisEvent)
})


app.listen(3000, function () {
    console.log('Listening on port 3000...')
})
