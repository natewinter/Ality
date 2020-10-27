// require npm express and express router
const express = require("express");

const router = express.Router();

// Define sequelize db model to use the database functions and the Ality helper.
const db = require("../models/");
const AlityHelper = require("../js/AlityHelper.js");
// require bcrypt for sessions
const bcrypt = require("bcrypt");

// For testing
const seeder = require("../db/seeder.js");

// seeder.seed();

// PUBLIC =========================================================================================================
// render home page
router.get("/", (req, res) => {
    const renderData = {userdata:req.session.user}
    res.status(200).render("index", renderData);
});

router.get("/401", (req, res) => {
    const renderData = {userdata:req.session.user}
    res.status(401).render("401", renderData);
});

router.get("/404", (req, res) => {
    const renderData = {userdata:req.session.user}
    res.status(404).render("404", renderData);
});
// render unique users page upon proper authentication
router.get("/users/:name", (req, res) => {
    const renderData = {userdata:req.session.user};
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
                    console.log("name and lists: ", nameAndLists);
                    renderData.nameAndLists = nameAndLists;
                    return res.render("user", renderData);
                });
            } else {
                return res.status(401).render("401", renderData);
            }
            
        } else {
            return res.status(404).render("404", renderData);
        }
    }).catch(function (err) {
        console.log(err);
    });
});

router.get("/stat-list/:id", (req, res) => {
    const renderData = {userdata:req.session.user};

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
                        
                        
                        renderData.stat_list = AlityHelper.buildStatList(dbStat_List.name, dbData_Values, dbStat_Def);
                        
                        return res.render("stat_list", renderData);
                    });
                })

            }else{
                return res.status(401).render("401", renderData);
            }
        } else {
            return res.status(404).render("404", renderData);
        }
    }).catch(function (err) {
        console.log(err);
    });
});

router.delete("/api/stat-list/:id", (req, res) => {
    // Get the stat list with the given id
    db.Stat_List.destroy({
        where: {
            id: req.params.id,
        }
    }).then(function (dbStat_List) {
        // Only show if owned by user
        res.json(dbStat_List)
        
    }).catch(function (err) {
        console.log(err);
        res.status(500).send("500: There was an internal server error")
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
    }).catch(function (err) {
        console.log(err);
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
    }).catch(err=>{
        console.log(err);
        res.status(500).send("server error")
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
    }).catch(function (err) {
        console.log(err);
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
    }).catch(err=>{
        console.log(err);
        res.status(500).send("server error")
    });
});
// TODO: Still not redirecting to 401
router.post('/login', (req, res) => {
    db.User.findOne({
        where: { username: req.body.username }
    }).then(user => {
        //check if user entered password matches db password
        if (!user) {
            req.session.destroy();

            console.log("\n\nIMPROPER LOGIN ATTEMPT\n\n");
// TODO: Why won't it render 401?
            return res.status(401).end();
 
        } else if (bcrypt.compareSync(req.body.password, user.passhash)) {
            req.session.user = {
                username: user.username,
                email: user.email,
                id: user.id
            }
            return res.status(302).json(req.session.user).redirect("/users/"+user.username);
        }
        else {
            req.session.destroy();
            return res.status(401).end();
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).send("server error")
    });
})

router.get('/logout', (req, res) => {
   if (req.session) {req.session.destroy();
    return res.status(200).redirect("/")
   } else {
       return res.status(404).redirect("/");
   }
})

router.get("/api/ality", function (req, res) {
    db.Ality.findAll().then(function (dbAlity) {
        console.log(dbAlity);
        return res.json(dbAlity)
    }).catch(err=>{
        console.log(err);
        res.status(500).send("server error")
    });
});

router.post("/api/stat-defs", function (req, res) {
    db.Stat_Def.create({
        name: req.body.name,
        stat_type: req.body.stat_type,
        StatListId: req.body.StatListId
    }).then(function (dbStatDef) {
        console.log(dbStatDef);
        res.redirect("/user")
    }).catch(err=>{
        console.log(err);
        res.status(500).send("server error")
    });
});

router.get("/api/stat-defs", function (req, res) {
    db.Stat_Def.findAll().then(function (dbStatDef) {
        console.log(dbStatDef);
        return res.json(dbStatDef)
    }).catch(err=>{
        console.log(err);
        res.status(500).send("server error")
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
        res.send(200);
    }).catch(err=>{
        console.log(err);
        res.status(500).send("server error")
    });
});

router.get("/api/data-values", function (req, res) {
    db.Data_Value.findAll().then(function (dbDataValue) {
        console.log(dbDataValue);
        return res.json(dbDataValue)
    }).catch(err=>{
        console.log(err);
        res.status(500).send("server error")
    });
});

router.get("/api/users/:id", (req, res) => {
    db.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (dbUser) {
        console.log(dbUser);
        if(!dbUser){
            return res.status(404).end()
        };
        return res.json(dbUser)
    }).catch(function (err) {
        console.log(err);
    });
});

router.get("/sessiondata", (req, res) => {
    res.json(req.session);
})

router.get("*", (req, res) => {
    res.status(404).render("404");
});

module.exports = router;
