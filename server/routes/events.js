var express = require('express');
var router = express.Router();

//Placeholder until db conn setup
let events = [
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

router.get('/:id?', (req, res) => {
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

router.post('/', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

//export this router to use in our index.js
module.exports = router;
