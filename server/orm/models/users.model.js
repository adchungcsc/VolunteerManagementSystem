const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('users', {
            user_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING
            },
            phone_number: {
                allowNull: false,
                type: DataTypes.STRING
            },
            role: {
                allowNull: false,
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: "users"
        }).schema("public");
}
