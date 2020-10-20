const express = require("express");

const router = express.Router();

// Import the model (cat.js) to use its database functions.
const db = require("../models/");

//Build routes here!!!
router.get("/", (req,res) => {
    console.log("ality test");
    return res.render("index");
} )
module.exports = router;