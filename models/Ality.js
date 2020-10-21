module.exports = function (sequelize, DataTypes) {
    let Ality = sequelize.define("Ality", {
        name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(128)
        }
    });
    Ality.associate = function (models) {
        Ality.belongsTo(models.Stat_List);
        Ality.hasMany(models.Data_Value);
    }
    return Ality;
};