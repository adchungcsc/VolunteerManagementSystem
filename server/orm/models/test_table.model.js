const {DataTypes} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('test_table', {
            // The following specification of the 'id' attribute could be omitted
            // since it is the default.
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            item: {
                allowNull: false,
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
            schema: "participance_updated_cols",
            tableName: "test_table"
        });
}
