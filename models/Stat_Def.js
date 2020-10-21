module.exports = function (sequelize, DataTypes) {
    const statDefs = sequelize.define("stat_def", {
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
}