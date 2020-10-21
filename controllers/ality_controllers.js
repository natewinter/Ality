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
        return res.render("index",dbUser);
        
    })
});
router.get("/:username", (req, res)=> {
    db.User.findOne({
        where:{
            username:req.params.username
        }
    }
    ).then(function(dbUser){
        console.log(dbUser)
        return res.render("index",dbUser);
        
    })
});

router.get("/:username/:stat_list", (req, res)=> {
    db.User.findOne({
        where:{
            username:req.params.username
        },
        include: [db.statList]
    }
    ).then(function(dbUser){
        console.log(dbUser)
        return res.render("index",dbUser);
        
    })
});

router.post('/users/create', function(req,res){
    db.User.create({
        username: req.body.username,
        email: req.body.email
    }).then(function(dbUser){
        console.log(dbUser);
        res.redirect("/")
    })
})

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