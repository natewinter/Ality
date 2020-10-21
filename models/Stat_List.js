module.exports = function (sequelize, DataTypes) {
        const Stat_List = sequelize.define("Stat_List", {
            user_id: {
                type: DataTypes.INTEGER
            },
            stat_list_name: {
               type: DataTypes.STRING(128),
               allowNull: false
            },
            public: {
                type: DataTypes.BOOLEAN,
                default: false
            }  
        });
        Stat_List.associate = function(models){
            Stat_List.belongsTo(models.User);
            Stat_List.hasMany(models.Ality);
        }
        return Stat_List;

};