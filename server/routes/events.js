var express = require('express');
const {models} = require("../orm");
const {isLoggedIn} = require("../index");
const sequelize = require("../orm");
const {Op, Sequelize} = require("sequelize");
var router = express.Router();


router.get('/:id?', isLoggedIn, async (req, res) => {
    /**
     * Get events
     */
    // Optional find an event by ID
    let queried_id = req.params.id
    // Optional find an event by name
    let event_name = req.query.event_name || ""
    event_name = event_name.toLowerCase()
    // Optional find events within a start and end range.
    let target_date = new Date();
    target_date.setDate(target_date.getDate() + 180) // Default ~6 months into future
    let event_start_timestamp = req.query.event_start || (new Date("01 Jan 1970 00:00:00 GMT")).toISOString()
    let event_end_timestamp = req.query.event_end || target_date.toISOString()

    //Pagination
    let limit = req.query.pageSize || 100;
    let offset = req.query.skipToken || 0;

    if (queried_id === undefined) {
        let events = await models.event.findAndCountAll({
            where: {
                event_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + event_name + '%'),
                start_timestamp: {[Op.gte]: event_start_timestamp},
                end_timestamp: {[Op.lte]: event_end_timestamp},
            },
            attributes: {
                include: [[Sequelize.fn("COUNT", Sequelize.col("event_signups.event_signup_id")), "currentSignUps"]]
            },
            include: [{
                model: models.event_signup, attributes: []
            }],
            group: ['event.event_id'],
            subQuery: false,
            limit: limit,
            offset: offset
        }).catch(function (error) {
            console.log(error);
        });
        res.send({
            events: events.rows,
            count: events.count.length
        })
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


router.put('/:id', async (req, res) => {
    /**
     * Create new event
     */
    const event_id = req.params.id
    const name = req.body.event_name
    const location = req.body.event_location
    const event_start = req.body.event_start
    const event_end = req.body.event_end
    // const event_organizer = req.user.user_id // Organizer is user posting
    const event_max_volunteers = req.body.event_max_volunteers
    const event_description = req.body.event_description
    const event_image_path = req.body.event_image

    models.event.update(
        {
            event_name: name,
            event_location: location || "",
            event_start: event_start || "01 Jan 1970 00:00:00 GMT",
            event_end: event_end || "01 Jan 1970 00:00:00 GMT",
            event_max_volunteers: event_max_volunteers || 100,
            event_description: event_description || "",
            event_image: event_image_path
        }, {
            where: {event_id: event_id},
            returning: true
        }
    ).then((updated) => {
        res.status(201).send(updated)
    }).catch(err =>{
        console.log(err)
        res.status(404).send(err)
    })

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
    await addedEvent.save().catch((reason) => {
        // more gracefully handle later.
        res.status(400).send(reason)
    })
    res.status(201).send(addedEvent)
})

router.delete('/:id', isLoggedIn, async (req, res) => {
    /**
     * delete event
     */
    let deletedCount = await models.event.destroy({
        where: {
            event_id: req.params.id
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
