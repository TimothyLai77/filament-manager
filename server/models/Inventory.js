
module.exports = (sequelize, DataTypes) => {

    const Inventory = sequelize.define('Inventory',
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
            sequelize,
            modelName: 'Inventory',
            tableName: 'inventories',

        }
    );
    Inventory.associate = (models) => {
        Inventory.hasMany(models.Spool, { foreignKey: 'id' });
    }
    return Inventory;
}
