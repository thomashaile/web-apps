const handlers = require('./handlers');
const express = require('express');

// create the router
//_;
const router = express.Router();

// write the routes!
router.get('/', handlers.home);
router.get('/list', handlers.list);
router.post('/create/:name', handlers.create);
// export the router
module.exports = router;