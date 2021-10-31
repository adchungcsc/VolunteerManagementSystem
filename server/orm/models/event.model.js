const {DataTypes} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('event', {
            // The following specification of the 'id' attribute could be omitted
            // since it is the default.
            event_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            address: {
                allowNull: false,
                type: DataTypes.STRING
            },
            start_timestamp: {
                allowNull: false,
                type: DataTypes.DATE
            },
            end_timestamp: {
                allowNull: false,
                type: DataTypes.DATE
            },
            organizer_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            max_volunteers: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            description: {
                type: DataTypes.STRING
            },
            image_path: {
                type: DataTypes.STRING
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: "event"
        }).schema("public");
}
