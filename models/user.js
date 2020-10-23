const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true
        },
        passhash: {
            type: DataTypes.STRING(64),
        },
        salt: {
            type: DataTypes.INTEGER
        }    
    });
    User.associate = function(models){
        User.hasMany(models.Stat_List);
    }

    User.beforeCreate(function(user){
        user.passhash = bcrypt.hashSync(user.passhash, bcrypt.genSaltSync(10),null);
    })

    return User;
};