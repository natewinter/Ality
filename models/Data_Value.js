module.exports = function (sequelize, DataTypes) {
    const Data_Value = sequelize.define("Data_Value", {
        val_A: {
            type: DataTypes.DECIMAL
        },
        val_B: {
            type: DataTypes.DECIMAL
        }
    });
    Data_Value.associate = function (models) {
        Data_Value.belongsTo(models.Ality);
        Data_Value.belongsTo(models.Stat_Def);
    }
    return Data_Value;

};