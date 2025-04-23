//const { Sequelize } = require("sequelize");
import Sequelize from "sequelize";
import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const env = process.env;

// For node-postgres

/**
 * create a node-postgres client, this client has the credentials for checking
 * if the database/user exists already, so it will try to use the database name 
 * in the env.
 * @returns postgres client object
 */
const createClient = () => {
    const { Client } = pg
    const client = new Client({

        // NOTE: at least my Macbook, the default database is 'postgres'
        // and default login is just nothing... like literally `psql -d 'postgres'`
        //user: env.DATABASE_USER,
        // password: env.DATABASE_PASSWORD,
        host: 'localhost',
        port: env.DATABASE_PORT,
        database: env.DATABASE_NAME.toLowerCase()
    });
    return client;
}

/**
 * Sequelize connection 
 */

const sequelize = new Sequelize(
    env.DATABASE_NAME.toLowerCase(), // when creating the database and user postgres will auto lower case the names
    env.DATABASE_USER.toLowerCase(),
    env.DATABASE_PASSWORD, // password was set using double quotes so it should be case sensitive
    {
        host: env.DATABASE_SERVER,
        dialect: 'postgres',
        port: env.DATABASE_PORT,
    }
);

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
    const client = createClient();
    try {
        await client.connect();
        // postgres will auto lowercase, so if env had upper case letters, need to lower case it in the query.
        const dbQuery = `SELECT 1 FROM pg_database WHERE datname='${env.DATABASE_NAME.toLowerCase()}';`;
        const dbRes = await client.query(dbQuery);

        const userQuery = `SELECT 1 FROM pg_roles WHERE rolname='${env.DATABASE_USER.toLowerCase()}';`;
        const userRes = await client.query(userQuery);

        if (dbRes.rowCount > 0 && userRes.rowCount > 0) {
            await client.end();
            return true;
        } else {
            await client.end();
            return false;
        }
    } catch (e) {
        // todo: idk this is pretty bad. probably should think of a better way to 
        // todo2: check for existing database/user 
        console.log("db check failed/db does not exist");
        await client.end();
        return false;
    }
}

/**
 * init a postgres database for the app, creates the database with the user and password
 * specified in the .env file
 */
const initDb = async () => {
    // this is kinda jank, but on first time init, need to use the default postgres db,
    //
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
    try {
        await client.connect();

        // create credentials for db
        console.log(`Postgres-INIT: creating user: ${env.DATABASE_USER.toLowerCase()}`)
        const userCreateQuery = `CREATE USER ${env.DATABASE_USER} WITH PASSWORD '${env.DATABASE_PASSWORD}';`
        await client.query(userCreateQuery);


        // create database for app
        console.log(`Postgres-INIT: creating database: ${env.DATABASE_NAME.toLowerCase()}`)
        const dbCreateQuery = `CREATE DATABASE ${env.DATABASE_NAME} OWNER ${env.DATABASE_USER.toLowerCase()};`
        await client.query(dbCreateQuery);




        //todo: uhh idk what privleges to actually give?
        console.log(`Postgres-INIT: Granting privileges`)
        const privilegeQuery = `GRANT ALL PRIVILEGES ON DATABASE ${env.DATABASE_NAME} TO ${env.DATABASE_USER};`
        await client.query(privilegeQuery);
        await client.end();
        console.log(`Postgres-INIT: success`);

    } catch (e) {
        await client.end();
        console.log("Postgres-INIT: could not init:\n", e);
    }
};

// NOTE: don't call this exported connectToDb this is for internal use.
// use the one in data/models/index.js
const database = sequelize;
export { connectToDb, database, initDb, checkDbExists }