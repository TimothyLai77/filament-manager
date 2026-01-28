module.exports = (sequelize, DataTypes) => {
    const Spool = sequelize.define('Spool',
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
            finish: {
                type: DataTypes.STRING,
                allowNull: true
            },
            initialWeight: {
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
            dateAdded: {
                // no clue why need to call Sequelize first but ok?
                type: DataTypes.DATEONLY
            },
            isEmpty: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            numberOfJobs: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        },
        {
            sequelize,
            modelName: 'Spool',
            tableName: 'spools',

        }
    );

    Spool.associate = (models) => {
        Spool.hasMany(models.Job, { foreignKey: 'id' });
        Spool.belongsTo(models.Inventory, { foreignKey: 'id' });
    }
    return Spool;
}

