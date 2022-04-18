const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
module.exports = db = {};
module.exports.initialize = initialize;
initialize();


async function initialize() {
    // create db if it doesn't already exist
    try {
        const sequelize = new Sequelize('tutorialdb', 'root', 'root', {
            port: "3306",
            host: 'localhost',
            dialect: 'mysql',
            logging: false
        });

        db.User = require('../models/User')(sequelize);
        db.location = require('../models/location')(sequelize);
        db.Otp = require('../models/Otp')(sequelize);

        await sequelize.sync();
    } catch (error) {
        console.log(error)
    }
}