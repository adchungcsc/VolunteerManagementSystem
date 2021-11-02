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
            event_name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            event_location: {
                allowNull: false,
                type: DataTypes.STRING
            },
            event_start: {
                allowNull: false,
                type: DataTypes.DATE
            },
            event_end: {
                allowNull: false,
                type: DataTypes.DATE
            },
            event_organizer: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            event_max_volunteers: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            event_description: {
                type: DataTypes.STRING
            },
            event_image: {
                type: DataTypes.STRING
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: "event"
        }).schema("public");
}
