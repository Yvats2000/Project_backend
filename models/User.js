const { DataTypes, Sequelize, Model } = require('sequelize');

function model(sequelize) {
    const attributes = {
        id:{ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userName:{type:DataTypes.STRING},
        email:{type:DataTypes.STRING },
        password:{type:DataTypes.TEXT},
        admin:{type:DataTypes.BOOLEAN, defaultValue:false},
        createdBy:{type:DataTypes.INTEGER},

    }
    return sequelize.define('user',attributes,{ timestamps: false });

}

module.exports = model