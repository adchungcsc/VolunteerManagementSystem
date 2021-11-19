var express = require('express');
const {models} = require("../orm");
const {isLoggedIn} = require("../index");
var router = express.Router();


//Signup for event
router.post('/', isLoggedIn, async (req, res) => {
    /**
     * Create new signup
     */
    const event_id = req.body.event_id
    const user_id = req.body.user_id
    //TODO: Add logic for check if waitlisted.
    const is_waitlisted = false
    const waitlist_timestamp = "01 Jan 1970 00:00:00 GMT"

    const addedSignup = models.event_signup.build({
        event_id: event_id,
        user_id: user_id,
        is_waitlisted: is_waitlisted,
        waitlist_timestamp: waitlist_timestamp
    })
    await addedSignup.save().catch((reason) => {
        // TODO more gracefully handle later.
        res.status(400).send(reason)
    })
    res.status(201).send(addedSignup)
})

router.get('/event/:id', isLoggedIn, async (req, res) => {
    /**
     * Get who signed up for an event.
     */
    let queried_id = req.params.id
    if (queried_id === undefined) {
        let signups = await models.event_signup.findAll()
        res.send(signups)
    } else {
        let signups = await models.event_signup.findAll({
            where: {
                event_id: queried_id
            }
        });
        if (signups !== null) {
            res.send(signups)
        } else {
            //Didn't find event
            res.status(404).send({})
        }
    }
})

router.get('/user/:id', isLoggedIn, async (req, res) => {
    /**
     * Get events that a user has signed up for.
     */
    let queried_id = req.params.id
    if (queried_id === undefined) {
        // get current user if no user id passed.
        queried_id = req.user.user_id
    }
    let signups = await models.event_signup.findAll({
        where: {
            user_id: queried_id
        }
    });
    if (signups !== null) {
        res.send(signups)
    } else {
        //Didn't find event
        res.status(404).send({})
    }
})

router.delete("/:id", isLoggedIn, async (req, res) => {
    let deletedCount = await models.event_signup.destroy({
        where: {
            event_signup_id: req.params.id
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
