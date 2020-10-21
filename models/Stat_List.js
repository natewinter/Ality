module.exports = function (sequelize, DataTypes) {
        const statList = sequelize.define("stat_list", {
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