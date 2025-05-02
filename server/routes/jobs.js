const express = require('express');
const router = express.Router();

const { createJob, getJobs } = require('../modules/jobLogic.js');


/**
 * {
        'spoolId': 'spool-xxxxxxxx',
        'name': '...',
        'filamentAmountUsed': xx.xx
        'cost': xx.xx // can also leave as null to let backend calculate it
 * }
 */
router.post('/create', async (req, res) => {
    try {
        console.log('POST: /api/jobs/create')
        const payload = req.body;
        const spoolId = payload.spoolId;
        const newJob = await createJob(spoolId, payload);
        console.log('created job', newJob);
        res.send(newJob), 200
    } catch (e) {
        res.send(e), 500
    }

});


router.get('/', async (req, res) => {
    try {
        console.log('GET: /api/jobs/')
        const data = await getJobs();
        res.send(data), 200
    } catch (e) {
        res.send(e), 500
    }

})

module.exports = router;