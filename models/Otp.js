const { DataTypes, Sequelize } = require('sequelize');


function model(sequelize) {
    const attributes = {
        id:{type:DataTypes.INTEGER , autoIncrement: true, primaryKey: true},
        email:{type:DataTypes.STRING},
        code:{type:DataTypes.STRING},
        expireIn:{type:DataTypes.INTEGER}
    }
    return sequelize.define('otp', attributes,{ timestamps: false });
}

module.exports = model;
