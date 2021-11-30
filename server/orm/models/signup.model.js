const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('event_signup', {
            event_signup_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            event_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            user_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            is_waitlisted: {
                allowNull: false,
                type: DataTypes.BOOLEAN
            },
            waitlist_timestamp: {
                allowNull: false,
                type: DataTypes.DATE
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: "event_signup"
        }).schema("public");
}
