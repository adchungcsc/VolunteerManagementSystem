var express = require('express');
const {models} = require("../orm");
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

router.post('/', (req, res) => {
    /**
     * Create new event
     */
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
    //TOOD: Sequelize insert
    // events.push(addedEvent)
    res.status(201).send(addedEvent)
})

router.delete('/:id', (req, res) => {
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
