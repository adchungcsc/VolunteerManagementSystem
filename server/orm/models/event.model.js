const {DataTypes} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('event', {
            // The following specification of the 'id' attribute could be omitted
            // since it is the default.
            event_id: {
                field: 'event_id',
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            event_name: {
                field: 'name',
                allowNull: false,
                type: DataTypes.STRING
            },
            event_location: {
                field: 'address',
                allowNull: false,
                type: DataTypes.STRING
            },
            event_start: {
                field: "start_timestamp",
                allowNull: false,
                type: DataTypes.DATE
            },
            event_end: {
                field: "end_timestamp",
                allowNull: false,
                type: DataTypes.DATE
            },
            event_organizer: {
                field: "organizer_id",
                allowNull: false,
                type: DataTypes.INTEGER
            },
            event_max_volunteers: {
                field: "max_volunteers",
                allowNull: false,
                type: DataTypes.INTEGER
            },
            event_description: {
                field: "description",
                type: DataTypes.STRING
            },
            event_image: {
                field: "image_path",
                type: DataTypes.STRING
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: "event"
<<<<<<< HEAD
        }).schema("public");
}
=======
        }).schema("participance_updated_cols");
}
>>>>>>> 0204621... db and orm updates, @ldbattig and @rpcatalf
