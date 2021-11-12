var express = require('express');
const {models} = require("../orm");
var router = express.Router();

//Register attendance for event.


router.post('/', async (req, res) => {
    /**
     * Create new attendance for an event
     */
    const event_id = req.body.event_id
    const hours = req.body.hours
    const comment = req.body.comment
    const rating = req.body.rating
    const attendee_id = req.body.attendee_id

    const addedAttendance = models.event_attendance.build({
        event_id: event_id,
        hours: hours,
        comment: comment,
        rating: rating,
        attendee_id: attendee_id
    })
    await addedAttendance.save().catch((reason) => {
        // TODO more gracefully handle later.
        res.status(400).send(reason)
    })
    res.status(201).send(addedAttendance)
})

router.get('/event/:id', async (req, res) => {
    /**
     * Get who attended an event
     */
    let queried_id = req.params.id
    if (queried_id === undefined) {
        let attendance = await models.event_attendance.findAll()
        res.send(attendance)
    } else {
        let attendance = await models.event_attendance.findAll({
            where: {
                event_id: queried_id
            }
        });
        if (attendance !== null) {
            res.send(attendance)
        } else {
            //Didn't find event
            res.status(404).send({})
        }
    }
})

router.get('/user/:id', async (req, res) => {
    /**
     * Get event attendances a user has registered attendance for.
     */
    let queried_id = req.params.id
    if (queried_id === undefined) {
        let attendance = await models.event_attendance.findAll()
        res.send(attendance)
    } else {
        let attendance = await models.event_attendance.findAll({
            where: {
                attendee_id: queried_id
            }
        });
        if (attendance !== null) {
            res.send(attendance)
        } else {
            //Didn't find event
            res.status(404).send({})
        }
    }
})

router.delete("/:id", async (req, res) => {
    let deletedCount = await models.event_attendance.destroy({
        where: {
            event_attendance_id: req.params.id
        }
    })
    if(deletedCount === 1){
        res.status(204).send()
    }else{
        res.status(404).send()
    }
})

//export this router to use in our index.js
module.exports = router;
