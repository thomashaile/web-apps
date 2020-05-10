'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./middleware/logger');

// create the express app
const app = express();

// log all requests
app.use(logger);;
// parse the HTTP body
app.use(bodyParser.raw({ type: 'text/plain' }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const reply = `Welcome to the greeter!`;

    res.status(200).send(reply);
});

// GET: '/greeter/hi'
// response: status:200, "hello (query name), happy (query day)!"
app.get('/greeter/hi', (req, res) => {
        const reply = `hello ${req.query.name}, happy ${req.query.day}`;
        res.status(200)
            .send(reply);
    })
    // GET: '/greeter/bye'
    // response: status:200, "good bye (query name), happy (query day)!"
app.get('/greeter/bye', (req, res) => {
        const reply = `goodbye ${req.query.name}, happy ${req.query.day}!`;
        res.status(200)
            .send(reply);
    })
    // POST: '/greeter/hi'
    // behavior: log "hello (body name), happy (body day)!"
    // response: status:200
app.post('/greeter/hi', (req, res) => {
    const body = req.body.toString();
    console.log(body);
    res.sendStatus(200).send(`hello ${body.name}, happy ${body.day}!`);
})

// POST: '/greeter/bye'
// behavior: log "good bye (body name), happy (body day)!"
// response: status:200
app.post('/greeter/bye', (req, res) => {
    const body = req.body.toString();
    console.log(body);
    res.sendStatus(200).send(`good bye ${body.name}, happy ${body.day}!`);
})

// start the server
app.listen(
    config.PORT,
    () => {
        console.log(`Example app listening at http://localhost:${config.PORT} (${config.MODE} mode)`);
    }
);