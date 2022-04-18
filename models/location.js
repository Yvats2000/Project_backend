const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id:{type:DataTypes.INTEGER , autoIncrement: true, primaryKey: true},
        name:{type:DataTypes.STRING},
        isActive:{type:DataTypes.BOOLEAN},
       
    }
    return sequelize.define('location', attributes,{ timestamps: false , freezeTableName: true});
}

