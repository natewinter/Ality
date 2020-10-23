const db = require("../models");
const { StatTypes } = require("../js/AlityHelper.js");

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
        name: "STATS!!!!",
        public: true
    });

    // Create Alities

    await db.Ality.create({
        name: "My First Ality",
        image: "http://placekitten.com/400/400",
        StatListId: 1
    });

    await db.Ality.create({
        name: "My Second Ality",
        image: "http://placekitten.com/500/500",
        StatListId: 1
    });

    await db.Ality.create({
        name: "My Third Ality",
        image: "http://placekitten.com/600/600",
        StatListId: 1
    });

    await db.Ality.create({
        name: "My Fourth Ality",
        image: "http://placekitten.com/700/700",
        StatListId: 1
    });

    // Create Stat Defs

    await db.Stat_Def.create({
        name: "Cuteness",
        stat_type: StatTypes.RATIO.PLAIN
    })

    await db.Stat_Def.create({
        name: "Number of Cats",
        stat_type: StatTypes.COUNTER
    })

    await db.Stat_Def.create({
        name: "Nap-Attack Ratio",
        stat_type: StatTypes.RATIO.COLON
    })

    await db.Stat_Def.create({
        name: "Daily Memes",
        stat_type: StatTypes.AVERAGE
    })

    // DATA VALUES =================================

    // First Ality

    await db.Data_Value.create({
        val_A: 7,
        val_B: 10,
        AlityId: 1,
        StatDefId: 1
    });
    await db.Data_Value.create({
        val_A: 1,
        val_B: null,
        AlityId: 1,
        StatDefId: 2
    });
    await db.Data_Value.create({
        val_A: 2,
        val_B: 12,
        AlityId: 1,
        StatDefId: 3
    });
    await db.Data_Value.create({
        val_A: 4,
        val_B: 10,
        AlityId: 1,
        StatDefId: 4
    });

    // Second Ality

    await db.Data_Value.create({
        val_A: 8.5,
        val_B: 10,
        AlityId: 2,
        StatDefId: 1
    });
    await db.Data_Value.create({
        val_A: 1,
        val_B: null,
        AlityId: 2,
        StatDefId: 2
    });
    await db.Data_Value.create({
        val_A: 52,
        val_B: 13,
        AlityId: 2,
        StatDefId: 3
    });
    await db.Data_Value.create({
        val_A: 122,
        val_B: 10,
        AlityId: 2,
        StatDefId: 4
    });

    // Third Ality

    await db.Data_Value.create({
        val_A: 9.5,
        val_B: 10,
        AlityId: 3,
        StatDefId: 1
    });
    await db.Data_Value.create({
        val_A: 2,
        val_B: null,
        AlityId: 3,
        StatDefId: 2
    });
    await db.Data_Value.create({
        val_A: 5,
        val_B: 17,
        AlityId: 3,
        StatDefId: 3
    });
    await db.Data_Value.create({
        val_A: 42,
        val_B: 1,
        AlityId: 3,
        StatDefId: 4
    });

    // Fourth Ality

    await db.Data_Value.create({
        val_A: 9,
        val_B: 10,
        AlityId: 4,
        StatDefId: 1
    });
    await db.Data_Value.create({
        val_A: 1,
        val_B: null,
        AlityId: 4,
        StatDefId: 2
    });
    await db.Data_Value.create({
        val_A: 7,
        val_B: 12,
        AlityId: 4,
        StatDefId: 3
    });
    await db.Data_Value.create({
        val_A: 18,
        val_B: 20,
        AlityId: 4,
        StatDefId: 4
    });

}

module.exports.seed = seed;