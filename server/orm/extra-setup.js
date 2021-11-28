function applyExtraSetup(sequelize) {
    // TODO: Will implement all FK relations at a later date.
    const {users, event, event_attendance, event_signup} = sequelize.models;
    event.hasMany(event_signup, {foreignKey: "event_id"});
    event.hasMany(event_attendance, {foreignKey: "event_id"});
    event_signup.hasOne(users, {foreignKey: "user_id"});
    event_signup.hasOne(event, {foreignKey: "event_id"});
    event_attendance.hasOne(users, {foreignKey: "user_id", sourceKey: 'attendee_id'});
    event_attendance.hasOne(event, {foreignKey: "event_id", sourceKey: 'event_id'});

}

module.exports = {applyExtraSetup};
