module.exports = function (sequelize, DataTypes) {
    const Data_Value = sequelize.define("data_value", {
        val_A: {
            type: DataTypes.DECIMAL
        },
        val_B: {
            type: DataTypes.DECIMAL
        }
    });
    Data_Value.associate = function (models) {
        dataValues.belongsTo(models.Ality);
        dataValues.belongsTo(models.Stat_Def);
    }
    return Data_Value;

};