module.exports = function (sequelize, DataTypes) {
    const Stat_Def = sequelize.define("Stat_Def", {
        name: {
            type: DataTypes.STRING(64)
        },
        stat_type: {
            type: DataTypes.INTEGER
        }
    });
    Stat_Def.associate = function (models) {
        Stat_Def.hasMany(models.Data_Value);
        Stat_Def.belongsTo(models.Ality);
    }
    return Stat_Def;
}
