const Stat = require("./classes/Stat.js");
const Ality = require("./classes/Ality.js");
const StatList = require("./classes/StatList.js");
const StatTypes = Stat.StatTypes;

function buildStatList(name, sqlDataValues){
    let alities = {};
    for (const i in sqlDataValues) {
        const sqlStat = sqlDataValues[i];
        const alityId = sqlStat.AlityId;

        const stat = new Stat(sqlStat);

        // If the given ality already exists, add the stat to the ality
        // Otherwise, make the ality and add the stat
        if(alities[alityId]){
            alities[alityId].stats.push(stat);
        } else {
            alities[alityId] = new Ality(sqlStat.Ality);
            alities[alityId].stats.push(stat);
        }
    }
    return new StatList(name, alities);
}

module.exports = {Stat, Ality, StatList, StatTypes, buildStatList};