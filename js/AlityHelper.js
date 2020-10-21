const Stat = require("classes/Stat.js");
const Ality = require("classes/Ality.js");
const StatList = require("classes/StatList.js");

const StatTypes = {
    COUNTER: 0x01,
    RATIO: {
        PLAIN: 0x02,
        COLON: 0x04
    },
    AVERAGE: 0x08
}

module.exports = {Stat, Ality, StatList, StatTypes};