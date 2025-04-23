const { connectToDb } = require('../../modules/database')
const { Spool } = require('./Spool');
const { Job } = require('./Job');
const { Inventory } = require('./Inventory')

const modelList = [
    Job,
    Spool,
    Inventory
];

/**
 * connect to the database and then set the relations between
 * models/tables 
 */
const connectAndAssociate = async () => {
    // connect to the database and sync tables
    await connectToDb(modelList);

    // one spool -> many jobs
    // a job -> one spool
    Spool.hasMany(Job, { foreignKey: 'id' });
    // maybe this association should be belongstoMany for multi material/colour prints
    // but honestly I would rather just make another entry in the relavent spool
    Job.belongsTo(Spool, { foreignKey: 'id' });

    // one inventory -> many spool
    // a spool -> one inventory
    Inventory.hasMany(Spool, { foreignKey: 'id' });
    Spool.belongsTo(Inventory, { foreignKey: 'id' });

}

exports.startSequelize = connectAndAssociate;
