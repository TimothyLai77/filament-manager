require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const session = require('express-session');


const { runTests } = require('./tests/logicTest')
const spool_routes = require('./routes/spools.js')
const job_routes = require('./routes/jobs.js')
const staged_job_routes = require('./routes/stagedJobs.js')
const env = process.env;
const PORT = env.APP_PORT;
const CLIENT_FRONTEND_PATH = path.join(__dirname, "../", "frontend", "dist");
const db = require('./models/')

async function prepareApp() {
    console.log(`CLIENT_FRONTEND_PATH: ${CLIENT_FRONTEND_PATH}`);
    const app = express();
    app.set("trust proxy", 1);
    app.use(express.json());
    app.use(cors());

    // ================== SEQUELIZE and DB ==================
    // check if the database exists if not setup
    // if (!(await checkDbExists())) {
    //     console.log('db and user do not exist: ')
    //     await initDb();
    // } else {
    //     console.log('db and user already exist, skipping DB init')
    // }

    // Connect to postgres with sequelize for app functionality
    //await startSequelize();
    //await runTests();



    // ================== EXPRESS ==================


    app.use('/api/', spool_routes)
    app.use('/api/jobs/', job_routes);
    app.use('/api/stagedJobs/', staged_job_routes)
    app.use(express.static(CLIENT_FRONTEND_PATH));

    // express 5? updated some internal packages and it breaks using the '*' as a path
    // have to use this regex instead?
    // https://github.com/expressjs/express/issues/5936#issuecomment-2340677058
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.join(CLIENT_FRONTEND_PATH, 'index.html'));
    });

    app.listen(PORT, () => {
        console.log(`express started on port: ${PORT}`);
    })
}

prepareApp();