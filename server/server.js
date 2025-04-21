require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const session = require('express-session');

const { connectToDb } = require("./data/models/index");
const { initDb, checkDbExists } = require('./modules/database');
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
        await initDb();
    }
    //await initDb();

    //await connectToDb();

    // app.listen(PORT, () => {
    //     console.log("express started");
    // })
}

prepareApp();