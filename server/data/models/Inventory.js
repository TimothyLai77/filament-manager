const { Sequelize, DataTypes, Model } = require('sequelize');
const { database } = require('../../modules/database');
class Inventory extends Model { }

Inventory.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: database,
        modelName: 'inventory'
    }
);

exports.Inventory = Inventory;