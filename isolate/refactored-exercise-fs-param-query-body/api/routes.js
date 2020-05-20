const handlers = require('./handlers.js');
const express = require('express');

// create the router
const router = express.Router();

router.use((req, res, next) => {
    console.log('routes!');
    next();
});

router.get('/', (req, res) => {
    res.send('routes!');
});

// write the routes!
router.get('/', handlers.home);
router.post('/param/:value', handlers.paramV);
router.post('/body', handlers.bodyV);
router.post('/query', handlers.queryV);


module.exports = router;