const express = require("express");

const router = express.Router();

// Import the model to use its database functions.
const db = require("../models/");

//Build routes here!!!
router.get("/", (req, res)=>{
    res.render("index")
});

router.get("/:id", (req, res)=> {
    db.User.findOne({
        where:{
            id:req.params.id
        }
    }
    ).then(function(dbUser){
        console.log(dbUser)
        return res.render("user",hbsObject);
    })
});

router.post('/users/create',function(req,res){
    db.User.create({
        username:req.body.username,
        email:req.body.email
    }).then(function(dbUser){
        console.log(dbUser);
        res.redirect("/")
    })
})

//another post route to add a new stat_list

//another post route to add a new stat card on the ality page

router.get("/api/:id", (req, res)=> {
    db.User.findOne({
        where:{
            id:req.params.id
        }
    }
    ).then(function(dbUser){
        res.json(dbUser)
    })
});


module.exports = router;