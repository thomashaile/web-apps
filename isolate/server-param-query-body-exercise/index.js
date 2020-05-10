'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');
const logger = require('./middleware/logger');

// initialize the app
const app = express();

app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'text/plain' }));

// statically serve the frontend
app.use('/', express.static(path.join(__dirname, 'public')));

// declare the routes
app.post('/param/:value', (req, res) => {
    // read value from the param
    const paramValue = req.params.value;

    console.log(`param value: ${paramValue}`);

    const responseData = {
        paramValue,
    };
    res.json(responseData);
});

app.post('/query', (req, res) => {
    // read value from the query
    const queryValue = req.query.value;

    console.log(`query value: ${queryValue}`);

    const responseData = {
        queryValue,
    };
    res.json(responseData);
});

app.post('/body', (req, res) => {
    // read value from the body
    const bodyValue = req.body.value;

    console.log(`body value: ${bodyValue}`);

    const responseData = {
        bodyValue,
    };
    res.json(responseData);
});

// start the app
app.listen(config.PORT, () => {
    console.log(
        `Example app listening at http://localhost:${config.PORT} (${config.MODE} mode)`
    );
});