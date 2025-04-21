//const { Sequelize } = require("sequelize");
import Sequelize from "sequelize";
import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const env = process.env;

// For node-postgres
const { Client } = pg
const client = new Client({

    // NOTE: at least my Macbook, the default database is 'postgres'
    // and default login is just nothing... like literally `psql -d 'postgres'`
    //user: env.DATABASE_USER,
    // password: env.DATABASE_PASSWORD,
    host: 'localhost',
    port: env.DATABASE_PORT,
    database: 'postgres' // default postgres db?
});

// sequelize
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USER, env.DATABASE_PASSWORD, {
    host: env.DATABASE_SERVER,
    dialect: 'postgres',
    port: env.DATABASE_PORT,
});

// Connect to the data base and sync all the models 
async function connectToDb(modelList) {
    try {
        await sequelize.authenticate();
        console.log('Connection to Postgres has been established successfully.');

        //syncing and initialize all models
        // Iterate through modelList and create the table in the database if it doesn't exist
        // does nothing if it already exists
        await Promise.all(modelList.map(async (model) => {
            await model.sync()
            console.log(model.getTableName() + " synced")
        }));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const checkDbExists = async () => {
    try {
        await client.connect();
        const dbRes = await client.query(`SELECT 1 FROM pg_database WHERE datname='${env.DATABASE_NAME}';`);
        const userRes = await client.query(`SELECT 1 FROM pg_roles WHERE rolname='${env.DATABASE_USER}';`)
        client.end();
        if (dbRes.rowCount > 0 && userRes.rowCount > 0) {
            console.log('db and user already exist')
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log("db check failed", e);
        client.end();
        return false;
    }
}

const initDb = async () => {
    try {
        await client.connect();

        // create database for app
        console.log(`Postgres-INIT: creating database: ${env.DATABASE_NAME}`)
        const dbCreateQuery = `CREATE DATABASE ${env.DATABASE_NAME}`
        await client.query(dbCreateQuery);

        // create credentials for app
        console.log(`Postgres-INIT: creating user: ${env.DATABASE_USER}`)
        const userCreateQuery = `CREATE USER ${env.DATABASE_USER} WITH PASSWORD '${env.DATABASE_PASSWORD}'`
        await client.query(userCreateQuery);

        console.log(`Postgres-INIT: Granting privileges`)
        const privilegeQuery = `GRANT ALL PRIVILEGES ON DATABASE ${env.DATABASE_NAME} TO ${env.DATABASE_USER}`
        await client.query(privilegeQuery);
        await client.end();
        console.log(`Postgres-INIT: success`);

    } catch (e) {
        console.log("Postgres-INIT: could not connect", e);
    }
};


// don't call this one when starting the server. Use function in data/models/index.js
// exports.connectToDb = connectToDb;
// exports.database = sequelize;
// es style exports?
const database = sequelize;
export { connectToDb, database, initDb, checkDbExists }