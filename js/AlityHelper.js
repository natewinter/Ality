const Stat = require("./classes/Stat.js");
const Ality = require("./classes/Ality.js");
const StatList = require("./classes/StatList.js");
const StatDef = require("./classes/StatDef.js");
const StatTypes = Stat.StatTypes;

function buildStatList(name, sqlDataValues){
    let alities = {};
    let statDefs = {};
    for (const i in sqlDataValues) {
        const sqlStat = sqlDataValues[i];
        const alityId = sqlStat.AlityId;
        const statDefId = sqlStat.StatDefId;

        const stat = new Stat(sqlStat);
        const statDef = new StatDef(sqlStat.Stat_Def.name, sqlStat.Stat_Def.stat_type, sqlStat.StatDefId);


        // If the given ality already exists, add the stat to the ality
        // Otherwise, make the ality and add the stat
        if(alities[alityId]){
            alities[alityId].stats.push(stat);
        } else {
            alities[alityId] = new Ality(sqlStat.Ality);
            alities[alityId].stats.push(stat);
        }

        // If the given statdef doesn't already exist, add it to the list
        if(!statDefs[statDefId]){
            statDefs[statDefId] = statDef;
        }
    }
    return new StatList(name, alities, statDefs);
}

module.exports = {Stat, Ality, StatList, StatTypes, buildStatList};