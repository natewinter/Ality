module.exports = function (sequelize, DataTypes) {
    let statDefs = sequelize.define("statDefs", {
        name: {
            type: DataTypes.STRING(64)
        },
        stat_type: {
            type: DataTypes.INTEGER
        }
    });
    statDefs.associate = function (models) {
        statDefs.hasMany(models.dataValues);
    }
    return statDefs;
};