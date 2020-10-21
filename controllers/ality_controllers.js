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

router.post('/users/create',function(req,res){
    db.User.create({
        username:req.body.username,
        email:req.body.email
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

router.get("/test/stat-list", (req, res)=>{
    let testStatList = {
        name: "My new test stat list!",
        alities: [
            {
                name: "My First Ality",
                imgsrc: "https://placekitten.com/700/700",
                stats: [
                    {
                        name: "Cuteness",
                        type: "ratio",
                        ratio: true,
                        quo: 0.9,
                        percentage: 90
                    },
                    {
                        name: "Number of Cats",
                        type: "counter",
                        counter: true,
                        a: 1
                    },
                    {
                        name: "Nap-Attack Ratio",
                        type: "ratio",
                        ratio: true,
                        colonForm: true,
                        a: 7,
                        b: 12,
                        quo: 7/12,
                        percentage: 700/(12+7)
                    },
                    {
                        name: "Daily Memes",
                        average: true,
                        quo: 0.9
                    }
                ]
            },{
                name: "My Second Ality",
                imgsrc: "https://placekitten.com/400/400",
                stats: [
                    {
                        name: "Cuteness",
                        type: "ratio",
                        ratio: true,
                        quo: 0.7,
                        percentage: 70
                    },
                    {
                        name: "Number of Cats",
                        type: "counter",
                        counter: true,
                        a: 1
                    },
                    {
                        name: "Nap-Attack Ratio",
                        type: "ratio",
                        ratio: true,
                        colonForm: true,
                        a: 2,
                        b: 12,
                        quo: 2/12,
                        percentage: 200/(12+2)
                    },
                    {
                        name: "Daily Memes",
                        average: true,
                        quo: 0.4
                    }
                ]
            },{
                name: "My Third Ality",
                imgsrc: "https://placekitten.com/500/500",
                stats: [
                    {
                        name: "Cuteness",
                        type: "ratio",
                        ratio: true,
                        quo: 0.85,
                        percentage: 85
                    },
                    {
                        name: "Number of Cats",
                        type: "counter",
                        counter: true,
                        a: 1
                    },
                    {
                        name: "Nap-Attack Ratio",
                        type: "ratio",
                        ratio: true,
                        colonForm: true,
                        a: 52,
                        b: 13,
                        quo: 52/13,
                        percentage: 5200/(13+52)
                    },
                    {
                        name: "Daily Memes",
                        average: true,
                        quo: 12.2
                    }
                ]
            },{
                name: "My Fourth Ality",
                imgsrc: "https://placekitten.com/600/600",
                stats: [
                    {
                        name: "Cuteness",
                        type: "ratio",
                        ratio: true,
                        quo: 0.95,
                        percentage: 95
                    },
                    {
                        name: "Number of Cats",
                        type: "counter",
                        counter: true,
                        a: 2
                    },
                    {
                        name: "Nap-Attack Ratio",
                        type: "ratio",
                        ratio: true,
                        colonForm: true,
                        a: 5,
                        b: 17,
                        quo: 5/17,
                        percentage: 500/(17+5)
                    },
                    {
                        name: "Daily Memes",
                        average: true,
                        quo: 42
                    }
                ]
            }
        ]
    }
    res.render("stat_list", testStatList);
})


module.exports = router;