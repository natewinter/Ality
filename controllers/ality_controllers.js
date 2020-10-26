const express = require("express");

const router = express.Router();

// Import the model to use its database functions.
const db = require("../models/");
const AlityHelper = require("../js/AlityHelper.js");

const bcrypt = require("bcrypt");

const seeder = require("../db/seeder.js");

// seeder.seed();

//Build routes here!!!

// PUBLIC =========================================================================================================
router.get("/", (req, res) => {
    res.render("index");
});
// THIS route did not return UNIQUE stat list info when i ran test....
router.get("/users/:name", (req, res) => {
    db.User.findOne({
        where: {
            username: req.params.name,
        }
    }).then(function (dbUser) {
        if ((dbUser)&&(req.session.user)) {
            if(req.session.user.username==dbUser.username){
                db.Stat_List.findAll({
                    include: [
                        {
                            model: db.User 
                        }
                    ],
                    where: {
                        UserId: dbUser.id
                    }
                }).then(dbStat_Lists => {
                    const statListArray = [];
                    for (let index = 0; index < dbStat_Lists.length; index++) {
                        const element = dbStat_Lists[index].toJSON();
                        statListArray.push(element);
                    }
                    const nameAndLists = {
                        user: dbUser.toJSON(),
                        stat_lists: statListArray
                    }
                    console.log(nameAndLists);
                    return res.render("user", nameAndLists);
                });
            } else {
                return res.status(401).send("Unauthorized! You aren't that user!");
            }
            
        } else {
            return res.status(404).render("404");
        }
    });
});

router.get("/stat-list/:id", (req, res) => {
    // Get the stat list with the given id
    db.Stat_List.findOne({
        where: {
            id: req.params.id,
        }
    }).then(function (dbStat_List) {
        // Only show if owned by user
        if (dbStat_List && req.session.user) {
            if(dbStat_List.UserId==req.session.user.id){
                
                // If owned by user, get stat defs
                db.Stat_Def.findAll({
                    where: {
                        StatListId: dbStat_List.id
                    }
                }).then(dbStat_Def=>{
                    
                    // Get Data Values
                    db.Data_Value.findAll({
                        include: [
                            {
                                model: db.Ality
                            },
                            {
                                model: db.Stat_Def
                            }
                        ],
                        where: {
                            "$Ality.StatListId$": dbStat_List.id
                        }
                        
                    }).then(dbData_Values => {
                        // Render
                        console.log("RENDERING "+dbStat_List.name);
                        console.table(dbData_Values);
                        
                        let stat_list = AlityHelper.buildStatList(dbStat_List.name, dbData_Values, dbStat_Def);
                        
                        return res.render("stat_list", stat_list);
                    });
                })

            }else{
                return res.status(401).send("Unauthorized! You aren't the owner of that stat list!");
            }
        } else {
            return res.status(404).render("404");
        }
    });
});

//  APIS =====================================================================

router.post("/api/users", function (req, res) {
    db.User.create({
        username: req.body.username,
        email: req.body.email,
        passhash: req.body.password
    }).then(function (dbUser) {
        req.session.user = {
            username: dbUser.username,
            email: dbUser.email,
            id: dbUser.id
        }
        // res.redirect("/users/"+dbUser.username)
        res.json(req.session.user);
    }).catch(err=>{
        console.log(err);
        res.status(500).send("server error")
    });
});

router.get("/api/users", function (req, res) {
    db.User.findAll().then(function (dbUser) {
        if (!dbUser) {
            return res.status(404).end()
        };
        console.log(dbUser);
        return res.json(dbUser);
    });
});

router.post("/api/stat-lists", function (req, res) {
    console.log("\n req.body:", req.body);
    console.log("THIS IS REALLY BIG CAPS")
    db.Stat_List.create({
        name: req.body.name,
        UserId: req.body.UserId
    }).then(function (dbStatlist) {
        
        console.table(dbStatlist);
        // res.reload();
        res.json(dbStatlist)
    }).catch(function (err) {
        console.log(err);
    });
});

router.get("/api/stat-lists", function (req, res) {
    db.Stat_List.findAll().then(function (dbStatlist) {
        console.log(dbStatlist);
        // res.reload();
        if (!dbStatlist) {
            return res.status(404).end()
        };
        return res.json(dbStatlist);
    });
});

router.post("/api/ality", function (req, res) {
    db.Ality.create({
        name: req.body.name,
        image: req.body.image,
        StatListId: req.body.StatListId
    }).then(function (dbAlity) {
        console.log(dbAlity);
        
        res.json(dbAlity.dataValues);
    });
});

router.post('/login', (req, res) => {
    db.User.findOne({
        where: { username: req.body.username }
    }).then(user => {
        //check if user entered password matches db password
        if (!user) {
            req.session.destroy();
            return res.status(401).send('incorrect email or password')

        } else if (bcrypt.compareSync(req.body.password, user.passhash)) {
            req.session.user = {
                username: user.username,
                email: user.email,
                id: user.id
            }
            return res.status(200).send("/users/"+user.username);
        }
        else {
            req.session.destroy();
            return res.status(401).send('incorrect email or password')
        }
    })
})

router.get("/api/ality", function (req, res) {
    db.Ality.findAll().then(function (dbAlity) {
        if (!dbAlity) {
            return res.status(404).end()
        };
        console.log(dbAlity);
        // res.reload();
        return res.json(dbAlity)
    });
});

router.post("/api/stat-defs", function (req, res) {
    db.Stat_Def.create({
        name: req.body.name,
        stat_type: req.body.stat_type,
        StatListId: req.body.StatListId
    }).then(function (dbStatDef) {
        console.log(dbStatDef);
        // res.reload();
        res.redirect("/user")
    });
});

router.get("/api/stat-defs", function (req, res) {
    db.Stat_Def.findAll().then(function (dbStatDef) {
        console.log(dbStatDef);
        // res.reload();
        if (!dbStatDef) {
            return res.status(404).end()
        };
        console.log(dbStatDef);
        // res.reload();
        res.json(dbStatDef)
    });
});

router.post("/api/data-values", function (req, res) {
    console.log("GETTING POSTED\n\n")
    console.log(req.body);
    db.Data_Value.bulkCreate(req.body.dataValueArray)
    .then(function (dbDataValue) {
        console.log(dbDataValue);
        // res.reload();
        // res.redirect("/user")
    });
});

router.get("/api/data-values", function (req, res) {
    db.Data_Value.findAll().then(function (dbDataValue) {
        console.log(dbDataValue);
        if (!dbDataValue) {
            return res.status(404).end()
        };
        console.log(dbDataValue);
        // res.reload();
        return res.json(dbDataValue)
    });
});

router.get("/api/users/:id", (req, res) => {
    db.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (dbUser) {
        res.json(dbUser)
    })
});

router.get("/sessiondata", (req, res) => {
    res.json(req.session);
})

module.exports = router;
