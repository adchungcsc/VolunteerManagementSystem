var express = require('express');
var router = express.Router();

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

router.post('/attend', (req, res) => {
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

router.get('/attend/event/:id', (req, res) => {
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

router.get('/attend/user/:id', (req, res) => {
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


//export this router to use in our index.js
module.exports = router;
