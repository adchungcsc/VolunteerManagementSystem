const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// to support JSON-encoded bodies
app.use(bodyParser.json());
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    //Health/sanity check endpoint
    res.send('Hello World!')
})

//TODO: Register new users

let users = [
    {
        user_id: 0,
        name: "John Cena",
        email: "JCena@ncsu.edu",
        phone_number: "911",
        role: "Administrator"
    },
    {
        user_id: 1,
        name: "Mark Zuckerberg",
        email: "mark@ncsu.edu",
        phone_number: "911",
        role: "User"
    }
]

let eventCounter = 2 //temp fill in for serial aut inc

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

app.get('/user/:id?', (req, res) => {
    /**
     * Get a user based on ID
     */
    let queried_id = req.params.id
    if (queried_id === undefined) {
        res.send(users)
    } else {
        //Placeholder until db conn setup
        users.forEach(user => {
            console.log(user)
            console.log(user.user_id)
            console.log(queried_id)
            if (user.user_id === parseInt(queried_id)) {
                res.send(user)
            }
        })
        //Didn't find event
        res.send({})
    }
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
        //TODO: add error checking
        //TODO: link to existing user for organizer.
    const addedEvent = {
            id: ++eventCounter,
            name: req.body.name,
            address: req.body.address,
            start_timestamp: req.body.start_timestamp,
            end_timestamp: req.body.end_timestamp,
            organizer_id: 0,
            max_volunteers: req.body.max_volunteers,
            description: req.body.description,
            image_path: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
    }
    events.push(addedEvent)
    res.send(addedEvent)
})

app.delete('/event/:id', (req, res) => {
    /**
     * delete event
     */
    let queried_id = req.params.id
    for (let i = 0; i < events.length; i++) {
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
