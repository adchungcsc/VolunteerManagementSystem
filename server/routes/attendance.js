var express = require('express');
const {models} = require("../orm");
const {isLoggedIn} = require("../index");
const {Sequelize} = require("sequelize");
var router = express.Router();

//Register attendance for event.


router.post('/', isLoggedIn, async (req, res) => {
    /**
     * Create new attendance for an event
     */
    const event_id = req.body.event_id
    const hours = req.body.hours
    const comment = req.body.comment
    const rating = req.body.rating
    const attendee_id = req.user.user_id // Get user ID from session.

    //Naive duplicate check to prevent double signup. Make more efficient complicated sequelize tx in future.
    const count = await models.event_attendance.count({
        where: {
            event_id: event_id,
            attendee_id: attendee_id
        }
    })

    if(count >= 1){
        res.status(409).send("Already Signed Up")
    }else{
        const addedAttendance = models.event_attendance.build({
            event_id: event_id,
            hours: hours,
            comment: comment,
            rating: rating,
            attendee_id: attendee_id
        })
        await addedAttendance.save().then(() => res.status(201).send(addedAttendance)
        ).catch((reason) => {
            // more gracefully handle later.
            res.status(400).send(reason)
        })
    }
})


router.put('/:id', isLoggedIn, async (req, res) => {
    const event_attendance_id = req.params.id
    const hours = req.body.hours || 0
    const comment = req.body.comment || ""
    const rating = req.body.rating || 5

    models.event_attendance.update(
        {
            hours: hours,
            comment: comment,
            rating: rating,
        }, {
            where: {event_attendance_id: event_attendance_id},
        }
    ).then((updated) => {
        res.status(200).send(updated)
    }).catch(err => {
        console.log(err)
        res.status(404).send(err)
    })

})


router.get('/event/:id', isLoggedIn, async (req, res) => {
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
            },
            include: [{
                model: models.users,
                required: true
            }],
        });
        if (attendance !== null) {
            res.send(attendance)
        } else {
            //Didn't find event
            res.status(404).send({})
        }
    }
})

router.get('/user/:id?', isLoggedIn, async (req, res) => {
    /**
     * Get event attendances a user has registered attendance for.
     */
    let queried_id = req.params.id
    if (queried_id === undefined) {
        // If none specified get attendances registered by current user.
        queried_id = req.user.user_id
    }
    let attendance = await models.event_attendance.findAll({
        include: [{
            model: models.event,
        }],
        where: {
            attendee_id: queried_id
        },
    });
    if (attendance !== null) {
        res.send(attendance)
    } else {
        //Didn't find event
        res.status(404).send({})
    }
})

router.delete("/:id", isLoggedIn, async (req, res) => {
    let deletedCount = await models.event_attendance.destroy({
        where: {
            event_attendance_id: req.params.id
        }
    })
    if (deletedCount === 1) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})

//export this router to use in our index.js
module.exports = router;
