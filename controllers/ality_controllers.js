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
        
    }).catch(err=>{
        console.log(err)
        res.status(404).json(err);
    })
});

router.post('/users/create',function(req,res){
    db.User.create({
        username:req.body.username,
        email:req.body.email
    }).then(function(dbUser){
        console.log(dbUser);
        res.redirect("/")
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
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
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
});


module.exports = router;