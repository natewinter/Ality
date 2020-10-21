class StatList {
    constructor(sqlData){
        this.name = sqlData.name,
        this.alities = []
    }

    setAlities(alitiesArr){
        this.alities = alitiesArr;
    }
}

module.exports = StatList;


