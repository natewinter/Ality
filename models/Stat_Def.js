module.exports = function (sequelize, DataTypes) {
    const Stat_Def = sequelize.define("stat_def", {
        name: {
            type: DataTypes.STRING(64)
        },
        stat_type: {
            type: DataTypes.INTEGER
        }
    });
    Stat_Def.associate = function (models) {
        Stat_Def.hasMany(models.Data_Value);
    }
    return Stat_Def;
}