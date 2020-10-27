class StatList {
    constructor(name, alities, statDefs){
        this.name = name,
        this.alities = alities,
        this.statDefs = statDefs
    }

    setAlities(alitiesArr){
        this.alities = alitiesArr;
    }
}

module.exports = StatList;


