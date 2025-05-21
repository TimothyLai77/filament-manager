const express = require('express');
const router = express.Router();

const { createJob, getJobs, getJobsBySpool, editJob } = require('../modules/jobLogic.js');
const { NotEnoughFilamentError } = require('../errors/errors.js');


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
        if (e instanceof NotEnoughFilamentError) {
            res.status(501);
            res.send('not enough filament');
        } else {
            res.status(500);
            res.send('server error');
        }

    }

});

router.put('/edit/:jobId', async (req, res) => {
    try {
        console.log('PUT /API/jobs/edit/:jobId');
        const jobId = req.params.jobId;
        const payload = req.body;
        const editedJob = await editJob(jobId, payload);
        res.status(200).send(editedJob);
    } catch (e) {
        res.status(500);
        res.send(e)
    }
})


router.get('/', async (req, res) => {
    try {
        console.log('GET: /api/jobs/')
        const data = await getJobs();
        res.send(data), 200
    } catch (e) {
        res.status(500)
        res.send(e)
    }

})

/**
 * Returns a list of jobs that the spool has done.
 */
router.get('/history/:spoolId', async (req, res) => {
    try {
        console.log('GET /API/jobs/:spoolId');
        const spoolId = req.params.spoolId;
        const data = await getJobsBySpool(spoolId);
        res.status(200).send(data);
    } catch (e) {
        res.status(500);
        res.send(e)
    }
})

module.exports = router;