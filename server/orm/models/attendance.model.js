const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('event_attendance', {
            event_attendance_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            event_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            hours: {
                allowNull: false,
                type: DataTypes.FLOAT
            },
            comment: {
                allowNull: false,
                type: DataTypes.STRING
            },
            rating: {
                allowNull: false,
                type: DataTypes.FLOAT
            },
            attendee_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: "event_attendance"
        }).schema("participance_updated_cols");
}
