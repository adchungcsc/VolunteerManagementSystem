function applyExtraSetup(sequelize) {
    // TODO: Will implement all FK relations at a later date.
    const {users, event, event_attendance, event_signup} = sequelize.models;
    event.hasOne(users);
    event.hasMany(event_signup, {foreignKey: "event_id"});
    event.hasMany(event_attendance, {foreignKey: "event_id"});
}

module.exports = {applyExtraSetup};
