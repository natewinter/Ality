const express = require("express");

const router = express.Router();

// Import the model to use its database functions.
const db = require("../models/");

//Build routes here!!!
router.get("/", (req, res)=>{
    res.send("homepage")
})
router.get("/users", (req, res) =>{
    db.User.findAll({
        where: {
            id: req.params.id
        }
    }
    ).then(function(dbUser){
        res.json(dbUser)
    })

});
module.exports = router;