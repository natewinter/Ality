const StatTypes = {
    COUNTER: 0x01,
    RATIO: {
        PLAIN: 0x02,
        COLON: 0x04
    },
    AVERAGE: 0x08
}

class Stat {
    constructor(sqlData){
        this.name = sqlData.Stat_Def.name;
        this.type = sqlData.Stat_Def.stat_type;
        this.setTypeFlags();
        this.a = parseFloat(sqlData.val_A);
        this.b = parseFloat(sqlData.val_B);
        this.calculate();
    }

    setTypeFlags(){
        switch(this.type){
            case StatTypes.RATIO.COLON:
                this.colonForm=true;

            case StatTypes.RATIO.PLAIN:
                this.ratio=true;
                this.typeText="Ratio";
                break;

            case StatTypes.AVERAGE:
                this.average=true;
                this.typeText="Average";
                break;

            case StatTypes.COUNTER:
                this.counter=true;
                this.typeText="Counter";
                break;

            default:
                this.counter=true;
                this.typeText="UNKNOWN";
                break;
        }
    }

    calculate(){
        if(this.colonForm){
            let total = this.a+this.b;
            this.quo = this.a/total;
            console.log(total);
        }else if(this.ratio || this.average){
            this.quo = this.a/this.b;
        }

        this.percentage = this.quo*100;
        console.table([this.percentage, this.quo, this.a, this.b]);
    }
}

module.exports = Stat;