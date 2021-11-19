var express = require('express');
const {models} = require("../orm");
const {isLoggedIn} = require("../index");
var router = express.Router();


router.get('/:id?', async (req, res) => {
    /**
     * Get all events
     */
    let queried_id = req.params.id
    if (queried_id === undefined) {
        let events = await models.event.findAll()
        res.send(events)
    } else {
        let events = await models.event.findAll({
            where: {
                event_id: queried_id
            }
        });
        if (events !== null) {
            res.send(events)
        } else {
            //Didn't find event
            res.status(404).send({})
        }
    }
})

router.post('/', isLoggedIn, async (req, res) => {
    /**
     * Create new event
     */
    const name = req.body.event_name
    const location = req.body.event_location
    const event_start = req.body.event_start
    const event_end = req.body.event_end
    const event_organizer = req.user.user_id // Organizer is user posting
    const event_max_volunteers = req.body.event_max_volunteers
    const event_description = req.body.event_description
    const event_image_path = req.body.event_image


    const addedEvent = models.event.build({
        event_name: name,
        event_location: location || "",
        event_start: event_start || "01 Jan 1970 00:00:00 GMT",
        event_end: event_end || "01 Jan 1970 00:00:00 GMT",
        event_organizer: event_organizer,
        event_max_volunteers: event_max_volunteers || 100,
        event_description: event_description || "",
        event_image: event_image_path || "https://media.istockphoto.com/photos/bigeyed-naughty-obese-cat-behind-the-desk-with-red-hat-grey-color-picture-id1199279669?b=1&k=20&m=1199279669&s=170667a&w=0&h=munUsqGIlDAmKK0ouS12nHCuzDdoDfvNalw_hHvh6Ls="
    })
    await addedEvent.save().catch((reason) =>{
        // TODO more gracefully handle later.
        res.status(400).send(reason)
    })
    res.status(201).send(addedEvent)
})

router.delete('/:id', isLoggedIn, (req, res) => {
    /**
     * delete event
     */
    let queried_id = req.params.id
    let event = models.event.findOne({
        where: {
            event_id: queried_id
        }
    })
    if(event !== null){
        event.delete()
        res.status(200).send({})
    }else{
        res.status(404).send({})
    }
})

//export this router to use in our index.js
module.exports = router;
