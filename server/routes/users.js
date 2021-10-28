var express = require('express');
var router = express.Router();

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
router.get('/:id?', (req, res) => {
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
        res.status(404).send({})
    }
})

//export this router to use in our index.js
module.exports = router;
