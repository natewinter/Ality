class StatDef {
    constructor(sqlData){
        this.name = sqlData.name;
        this.statType = sqlData.stat_type;
        this.id = sqlData.id;
    }

}

module.exports = StatDef;