var express = require('express');
var router = express.Router();

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

router.post('/', (req, res) => {
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

router.get('/event/:id', (req, res) => {
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

router.get('/user/:id', (req, res) => {
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
//export this router to use in our index.js
module.exports = router;
