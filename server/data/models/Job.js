const { Sequelize, DataTypes, Model } = require('sequelize');
const { database } = require('../../modules/database');
class Job extends Model { }

Job.init(
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
        filamentUsed: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: Sequelize.DataTypes.DATEONLY
        }
    },
    {
        sequelize: database,
        modelName: 'Job'
    }
);

exports.Job = Job;