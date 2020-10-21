module.exports = function (sequelize, DataTypes) {
    let statList = sequelize.define("statList", {
        // commented out because we have userId already
        // userId: {
        //     type: DataTypes.INTEGER
        // },
        statListName: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        public: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    });
    statList.associate = function (models) {
        statList.belongsTo(models.User);
        statList.hasMany(models.Ality);
    }
    return statList;

};