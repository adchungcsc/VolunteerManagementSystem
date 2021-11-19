const {Sequelize} = require('sequelize');
const {applyExtraSetup} = require('./extra-setup');
require('dotenv').config();

const DATABASE_CONNECTION_STRING = process.env.DB_CONN_STR || "DECLARE DB_CONN_STR IN ENVIRONMENT VARIABLE";

const sequelize = new Sequelize(DATABASE_CONNECTION_STRING);

const modelDefiners = [
    require('./models/users.model'),
    require('./models/event.model'),
    require('./models/attendance.model'),
    require('./models/signup.model')
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
