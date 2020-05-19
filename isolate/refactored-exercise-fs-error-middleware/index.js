'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error-handler');
const api = require('./api/routes');

const FILE_DIR = path.join(__dirname, config.FILES_DIR);

const app = express();

app.use(logger);
app.use(bodyParser.json());

app.use('/api', api); //look api/ folder for index
app.use(errorHandler);

app.listen(
    config.PORT,
    () => {
        console.log(`Example app listening at http://localhost:${config.PORT} (${config.MODE} mode)`);
    }
);