const { StatTypes } = require("../AlityHelper");

class Stat {
    constructor(sqlData){
        this.name = sqlData.name;
        this.type = sqlData.type;
        this.setTypeFlags();
        this.a = sqlData.a;
        this.b = sqlData.b;
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
            this.quo = this.a/(this.a+this.b);
        }else if(this.ratio){
            this.quo = this.a/this.b;
        }

        this.percentage = quo*100;
    }
}

module.exports = Stat;