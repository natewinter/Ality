const Stat = require("./classes/Stat.js");
const Ality = require("./classes/Ality.js");
const StatList = require("./classes/StatList.js");
const StatDef = require("./classes/StatDef.js");
const StatTypes = Stat.StatTypes;

function buildStatList(name, sqlDataValues, sqlStatDefs){
    console.log("\nLOOK AT ME\n");
    console.table(sqlDataValues);
    let alities = {};
    let statDefs = [];
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

    for(const i in sqlStatDefs){
        const sqlStatDef = sqlStatDefs[i];
        statDefs.push(new StatDef(sqlStatDef));
    }
    return new StatList(name, alities, statDefs);
}

module.exports = {Stat, Ality, StatList, StatDef, StatTypes, buildStatList};