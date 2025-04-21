const { Sequelize, DataTypes, Model } = require('sequelize');
const { database } = require('../../modules/database');
class Spool extends Model { }

Spool.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colour: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        filamentUsed: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0
        },
        filamentLeft: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        datePurchased: {
            // no clue why need to call Sequelize first but ok?
            type: Sequelize.DataTypes.DATEONLY
        }
    },
    {
        sequelize: database,
        modelName: 'Spool'
    }
);

exports.Spool = Spool;