const express = require("express");

const router = express.Router();

// Import the model to use its database functions.
const db = require("../models/");

//Build routes here!!!
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/:id", (req, res) => {
  db.User.findOne({
    where: {
      id: req.params.id,
    },
  }).then(function (dbUser) {
    console.log(dbUser);
    return res.render("index", dbUser);
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

router.get("/:username", (req, res) => {
  db.User.findAll({
    where: {
      username: req.params.username,
    },
    include: [db.Stat_List],
  }).then(function (dbUser) {
    console.log(dbUser);
    return res.render("user", dbUser);
  });
});

router.post("/stat_list/create", function (req, res) {
  db.Stat_List.create({
    stat_list_name: req.body.stat_list,
  }).then(function (data) {
    console.log(data);
    // res.reload();
    res.redirect("/user")
  });
});

router.post("/users/create", function (req, res) {
  db.User.create({
    username: req.body.username,
    email: req.body.email,
  }).then(function (dbUser) {
    console.log(dbUser);
    res.redirect("/");
  });
});
router.post("/ality/create", function (req, res) {
  db.Ality.create({
    name: req.body.name,
    image: req.body.image,
    stat_list_id: req.body.stat_list_id
  }).then(function (dbUser) {
    console.log(dbUser);
    // res.reload();
    res.redirect("/user")
  });
});


router.get("/api/:id", (req, res) => {
  db.User.findOne({
    where: {
      id: req.params.id,
    },
  }).then(function (dbUser) {
    res.json(dbUser);
  });
});

router.get("/api/ality/:name", (req, res) => {
  db.Ality.findOne({
    where: {
      name: req.params.name,
    },
  }).then(function (data) {
    res.json(data);
  });
});



module.exports = router;
