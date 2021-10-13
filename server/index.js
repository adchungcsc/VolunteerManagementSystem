const express = require('express')
const app = express()

app.get('/', function (req, res) {
    //Health/sanity check endpoint
    res.send('Hello World!')
})

//TODO: Register new user (depended on impl)

//Placeholder until db conn setup
let events = [
    {
        id: 1,
        name: "Test Event",
        address: "1600 Penn",
        start_timestamp: null,
        end_timestamp: null,
        organizer_id: 0,
        max_volunteers: 10,
        description: "Super cool event!",
        image_path: "https://media.istockphoto.com/photos/bigeyed-naughty-obese-cat-behind-the-desk-with-red-hat-grey-color-picture-id1199279669?b=1&k=20&m=1199279669&s=170667a&w=0&h=munUsqGIlDAmKK0ouS12nHCuzDdoDfvNalw_hHvh6Ls="
    },
    {
        id: 2,
        name: "The other event",
        address: "123 Sesame Street",
        start_timestamp: null,
        end_timestamp: null,
        organizer_id: 0,
        max_volunteers: 20,
        description: "Super uncool event!",
        image_path: "https://media.istockphoto.com/photos/bigeyed-naughty-obese-cat-behind-the-desk-with-red-hat-grey-color-picture-id1199279669?b=1&k=20&m=1199279669&s=170667a&w=0&h=munUsqGIlDAmKK0ouS12nHCuzDdoDfvNalw_hHvh6Ls="
    },
]

app.get('/user/:id', (req, res) => {
    /**
     * Get a user based on ID
     */
    console.log(req.params.id)
    res.send('Hello World!')
})

app.get('/event/:id?', (req, res) => {
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
            console.log(event.id)
            console.log(queried_id)
            if (event.id === parseInt(queried_id)) {
                res.send(event)
            }
        })
        //Didn't find event
        res.send({})
    }
})

app.post('/event', (req, res) => {
    /**
     * Create new event
     */
    //TODO: accept params and create new event
    res.send('Hello World!')
})

app.delete('/event/:id', (req, res) => {
    /**
     * delete event
     */
    let queried_id = req.params.id
    for(let i = 0; i < events.length; i++){
        if (events[i].id === parseInt(queried_id)) {
            res.send(events[i])
            events.splice(i, 1)
        }
    }
    //found nothing
    res.send({})
})


app.listen(3000, function () {
    console.log('Listening on port 3000...')
})
