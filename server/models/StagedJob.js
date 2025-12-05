
module.exports = (sequelize, DataTypes) => {
    const StagedJob = sequelize.define('StagedJob', {
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
        date: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
    },
        {
            sequelize,
            modelName: 'StagedJob',
            tableName: 'stagedJobs',

        })



    return StagedJob;

}


