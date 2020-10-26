class StatDef {
    constructor(sqlData){
        this.name = sqlData.name;
        this.statType = sqlData.stat_type;
    }

}

module.exports = StatDef;