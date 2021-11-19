var express = require('express');
var router = express.Router();

const {models} = require('../orm');
const {isLoggedIn} = require("../index");

router.get('/:id?', isLoggedIn, async (req, res) => {
    /**
     * Get a user based on ID
     */
    let queried_id = req.params.id
    if (queried_id === undefined) {
        queried_id = req.user.user_id
    }
    let users = await models.users.findAll({
        where: {
            user_id: queried_id
        }
    });
    if (users !== null) {
        res.send(users)
    } else {
        //Didn't find event
        res.status(404).send({})
    }
})

//export this router to use in our index.js
module.exports = router;
