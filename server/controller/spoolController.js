const express = require('express');
const router = express.Router();

const {
    createSpool,
    getSpools,
    getSpoolById,
} = require('../modules/spoolLogic.js')

router.get('/spools', async (req, res) => {
    let body = req.body;
    console.log('GET receieved');
    const spools = await getSpools();
    res.send(spools);
})

module.exports = router;