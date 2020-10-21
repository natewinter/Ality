const express = require("express");

const router = express.Router();

// Import the model to use its database functions.
const db = require("../models/");

//Build routes here!!!

// PUBLIC =========================================================================================================
  router.get("/", (req, res) => {
      res.render("index");
  });

router.get("users/:id", (req, res) => {
    db.User.findOne({
        where: {
            id: req.params.id,
        },
    }).then(function (dbUser) {
        console.log(dbUser);
        return res.render("user", dbUser);
    });
});
router.get("stat-list/:id", (req, res) => {
    db.Stat_List.findOne({
        where: {
            id: req.params.id,
        },
    }).then(function (dbStat_List) {
        console.log(dbStat_List);
        return res.render("stat_list", dbStat_List);
    });
});

//  APIS =====================================================================

router.post("api/users", function (req, res) {
  db.User.create({
      username: req.body.username,
      email: req.body.email,
  }).then(function (dbUser) {
      console.log(dbUser);
      res.redirect("/");
  });
});
router.get("api/users", function (req, res) {
  db.User.findAll().then(function (dbUser) {
    if(!dbUser){
      return res.status(404).end()
    };
      console.log(dbUser);
      return res.json(dbUser);
  });
});
// router.get("/:username", (req, res)=> {
//     db.User.findOne({
//         where:{
//             username:req.params.username
//         }
//     }
//     ).then(function(dbUser){
//         console.log(dbUser)
//         return res.render("index",dbUser);

//     })
// });

// router.get("/:username", (req, res) => {
//     db.User.findAll({
//         where: {
//             username: req.params.username,
//         },
//         include: [db.Stat_List],
//     }).then(function (dbUser) {
//         console.log(dbUser);
//         return res.render("user", dbUser);
//     });
// });

router.post("api/stat-lists", function (req, res) {
    db.Stat_List.create({
        stat_list_name: req.body.stat_list,
    }).then(function (dbStatlist) {
        console.log(dbStatlist);
        // res.reload();
        res.redirect("/user")
    });
});
router.get("api/stat-lists", function (req, res) {
    db.Stat_List.findAll().then(function (dbStatlist) {
        console.log(dbStatlist);
        // res.reload();
        if(!dbStatlist){
          return res.status(404).end()
        };
        return res.json(dbStatlist);
    });
});

router.post("api/ality", function (req, res) {
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
router.get("api/ality", function (req, res) {
    db.Ality.findAll().then(function (dbAlity) {
      if(!dbAlity){
        return res.status(404).end()
      };
        console.log(dbAlity);
        // res.reload();
        return res.json(dbAlity)
    });
});

router.post("api/stat-defs", function (req, res) {
  db.Stat_Def.create({
      name: req.body.name,
      stat_type: req.body.stat_type
  }).then(function (dbStatDef) {
      console.log(dbStatDef);
      // res.reload();
      res.redirect("/user")
  });
});

router.get("api/stat-defs", function (req, res) {
  db.Stat_Def.findAll().then(function (dbStatDef) {
      console.log(dbStatDef);
      // res.reload();
      if(!dbStatDef){
        return res.status(404).end()
      };
        console.log(dbStatDef);
        // res.reload();
        return res.json(dbStatDef)
  });
});

router.post("api/data-values", function (req, res) {
  db.Data_Value.create({
      val_A: req.body.val_A,
      val_B: req.body.val_B
  }).then(function (dbDataValue) {
      console.log(dbDataValue);
      // res.reload();
      res.redirect("/user")
  });
});

router.get("api/data-values", function (req, res) {
  db.Data_Value.findAll().then(function (dbDataValue) {
      console.log(dbDataValue);
      if(!dbDataValue){
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

router.get("/test/stat-list", (req, res) => {
    let testStatList = {
        name: "My new test stat list!",
        alities: [{
            name: "My First Ality",
            imgsrc: "https://placekitten.com/700/700",
            stats: [{
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
                    quo: 7 / 12,
                    percentage: 700 / (12 + 7)
                },
                {
                    name: "Daily Memes",
                    average: true,
                    quo: 0.9
                }
            ]
        }, {
            name: "My Second Ality",
            imgsrc: "https://placekitten.com/400/400",
            stats: [{
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
                    quo: 2 / 12,
                    percentage: 200 / (12 + 2)
                },
                {
                    name: "Daily Memes",
                    average: true,
                    quo: 0.4
                }
            ]
        }, {
            name: "My Third Ality",
            imgsrc: "https://placekitten.com/500/500",
            stats: [{
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
                    quo: 52 / 13,
                    percentage: 5200 / (13 + 52)
                },
                {
                    name: "Daily Memes",
                    average: true,
                    quo: 12.2
                }
            ]
        }, {
            name: "My Fourth Ality",
            imgsrc: "https://placekitten.com/600/600",
            stats: [{
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
                    quo: 5 / 17,
                    percentage: 500 / (17 + 5)
                },
                {
                    name: "Daily Memes",
                    average: true,
                    quo: 42
                }
            ]
        }]
    }
    res.render("stat_list", testStatList);
})


module.exports = router;
