module.exports = function (sequelize, DataTypes) {
    const dataValues = sequelize.define("data_value", {
        val_A: {
            type: DataTypes.DECIMAL
        },
        val_B: {
            type: DataTypes.DECIMAL
        }
    });
    dataValues.associate = function (models) {
        dataValues.belongsTo(models.Ality);
        dataValues.belongsTo(models.StatDefs);
    }
    return dataValues;

}