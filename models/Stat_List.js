const { INTEGER } = require("sequelize/types");

module.exports = function (sequelize, DataTypes) {
        const statList = sequelize.define("statList", {
            userId: {
                type: DataTypes.INTEGER
            },
            statListName: {
               type: DataTypes.STRING(128),
               allowNull: false
            },
            public: {
                type: DataTypes.BOOLEAN,
                default: false
            }  
        });
        statList.associate = function(models){
            statList.belongsTo(models.User);
            statList.hasMany(models.Ality);
        }
        return statList;

    }