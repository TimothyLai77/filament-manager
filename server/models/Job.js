
module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define('Job', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        spoolId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filamentAmountUsed: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY
        }
    },
        {
            sequelize,
            modelName: 'Job',
            tableName: 'jobs',
            timestamps: false
        })


    Job.associate = (models) => {
        Job.belongsTo(models.Spool, { foreignKey: 'spoolId' });
    }
    return Job;

}


