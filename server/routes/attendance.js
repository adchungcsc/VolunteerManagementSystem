var express = require('express');
const {models} = require("../orm");
var router = express.Router();

//Register attendance for event.


router.post('/attend', (req, res) => {
    /**
     * Create new event
     */
    //TODO imp
    res.send({})
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
        try {
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
        } catch (error) {
            console.log(error);
        }
    }
})


//export this router to use in our index.js
module.exports = router;
