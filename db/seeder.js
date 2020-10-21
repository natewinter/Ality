const db = require("../models");

async function seed() {
    await db.User.create({
        email: "Test@test.test",
        username: "Test",
        passhash: "sadlkfjawlefawejnfasdkfjasef",
        salt: 1209
    }).then(function(result){
        console.log("HELLO");
    }).catch();
    
    await db.Stat_List.create({
        userId: 1,
        stat_list_name: "STATS!!!!",
        public: true
    });
}

module.exports.seed = seed;