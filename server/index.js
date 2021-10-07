const express = require('express')
const app = express()

app.get('/', function (req, res) {
    //Health/sanity check endpoint
    res.send('Hello World!')
})

//TODO: Register new user (dependend on impl)

app.get('/user/:id', (req, res) =>{
    /**
     * Get a user based on ID
     */
    console.log(req.params.id)
    res.send('Hello World!')
})

app.get('/event', (req, res) => {
    /**
     * Get all events
     */
    //TODO: Filter by date range/others
    res.send('Hello World!')
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
    //TODO: accept params and delete event based on id.
    res.send('Hello World!')
})



app.listen(3000, function () {
    console.log('Listening on port 3000...')
})
