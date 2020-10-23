const express = require("express");

const router = express.Router();

// Import the model to use its database functions.
const db = require("../models/");
const AlityHelper = require("../js/AlityHelper.js");

const seeder = require("../db/seeder.js");
const e = require("express");

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
        if (dbUser) {
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
            return res.status(404).render("404");
        }
    });
});

router.get("/stat-list/:id", (req, res) => {
    db.Stat_List.findOne({
        where: {
            id: req.params.id,
        }
    }).then(function (dbStat_List) {
        if (dbStat_List) {
            db.Data_Value.findAll({
                include: [
                    {
                        model: db.Ality
                    },
                    {
                        model: db.Stat_Def
                    }
                ]

            }).then(dbData_Values => {
                console.log(dbStat_List.name);

                let stat_list = AlityHelper.buildStatList(dbStat_List.name, dbData_Values);

                return res.render("stat_list", stat_list);
            });
        } else {
            return res.status(404).render("404");
        }
    });
});

//  APIS =====================================================================

router.post("/api/users", function (req, res) {
    db.User.create({
        username: req.body.username,
        email: req.body.email
    }).then(function (dbUser) {
        console.log(dbUser);
        res.redirect("/");
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
    console.log("req.body:", req.body);
    db.Stat_List.create({
        name: req.body.name,
        UserId: req.body.UserId
    }).then(function (dbStatlist) {
        console.log(dbStatlist);
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
        stat_list_id: req.body.stat_list_id
    }).then(function (dbAlity) {
        console.log(dbAlity);
        // res.reload();
        res.redirect("/user")
    });
});

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
        stat_type: req.body.stat_type
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
        return res.json(dbStatDef)
    });
});

router.post("/api/data-values", function (req, res) {
    db.Data_Value.create({
        val_A: req.body.val_A,
        val_B: req.body.val_B
    }).then(function (dbDataValue) {
        console.log(dbDataValue);
        // res.reload();
        res.redirect("/user")
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

module.exports = router;
