var express = require('express');
var router = express.Router();

const { models } = require('../orm');


//TODO: Register new users

router.get('/:id?', async (req, res) => {
    /**
     * Get a user based on ID
     */
    let queried_id = req.params.id
    if (queried_id === undefined) {
        let users = await models.users.findAll()
        res.send(users)
    } else {
        let users = await models.users.findAll({
            where: {
                user_id: queried_id
            }
        });
        if(users !== null){
            res.send(users)
        }else{
            //Didn't find event
            res.status(404).send({})
        }
    }
})

//export this router to use in our index.js
module.exports = router;
