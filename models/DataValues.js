module.exports = function (sequelize, DataTypes) {
    let dataValues = sequelize.define("dataValues", {
        val_A: {
            type: DataTypes.DECIMAL
        },
        val_B: {
            type: DataTypes.DECIMAL
        }
    });
    dataValues.associate = function (models) {
        dataValues.belongsTo(models.Ality);
        dataValues.belongsTo(models.statDefs);
    }
    return dataValues;

};