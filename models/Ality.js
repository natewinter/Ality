module.exports = function (sequelize, DataTypes) {
    const Ality = sequelize.define("Ality", {
        name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(128)
        }
    });
    Ality.associate = function (models) {
        Ality.belongsTo(models.statList);
        Ality.hasMany(models.dataValues);
    }
    return Ality;
}