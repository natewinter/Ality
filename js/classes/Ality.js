class Ality {
    constructor(sqlData){
        this.name = sqlData.name;
        this.imgsrc = sqlData.image;
        this.stats = [];
    }

    setStats(statsArr){
        this.stats = statsArr;
    }

}

module.exports = Ality;