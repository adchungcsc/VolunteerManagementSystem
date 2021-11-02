var express = require('express');
const {models} = require("../orm");
var router = express.Router();

let signupCounter = 3 //temp fill in for serial aut inc


//Signup for event

router.post('/', (req, res) => {
    /**
     * Create new event
     */
    //TODO: imp
    res.status(401).send({})
})

router.get('/event/:id', async (req, res) => {
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
        if(signups !== null){
            res.send(signups)
        }else{
            //Didn't find event
            res.status(404).send({})
        }
    }
})

router.get('/user/:id', async (req, res) => {
    /**
     * Get events that a user has signed up for.
     */
    let queried_id = req.params.id
    if (queried_id === undefined) {
        let signups = await models.event_signup.findAll()
        res.send(signups)
    } else {
        let signups = await models.event_signup.findAll({
            where: {
                user_id: queried_id
            }
        });
        if(signups !== null){
            res.send(signups)
        }else{
            //Didn't find event
            res.status(404).send({})
        }
    }
})
//export this router to use in our index.js
module.exports = router;
