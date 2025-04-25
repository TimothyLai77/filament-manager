require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const session = require('express-session');

const { startSequelize } = require("./data/models/index");
const { initDb, checkDbExists } = require('./modules/database');
const { runTests } = require('./tests/logicTest')
const env = process.env;
const PORT = 8080;



async function prepareApp() {
    // const app = express();
    // app.set("trust proxy", 1);
    // app.use(express.json());
    // app.use(cors());
    // app.use(expressSessionConfig);

    // app.use("/", express.static(CLIENT_FRONTEND_PATH));
    //app.use("/");

    // check if the database exists if not setup
    if (!(await checkDbExists())) {
        console.log('db and user do not exist: ')
        await initDb();
    } else {
        console.log('db and user already exist, skipping DB init')
    }

    // Connect to postgres with sequelize for app functionality
    await startSequelize();
    await runTests();
    // app.listen(PORT, () => {
    //     console.log("express started");
    // })
}

prepareApp();