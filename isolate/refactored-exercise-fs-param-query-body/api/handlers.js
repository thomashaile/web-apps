const fs = require('fs');
const path = require('path');
const config = require('../config');

const FILES_DIR = path.join(__dirname, '/..', config.FILES_DIR);

const handlers = {
    home: (req, res) => {
        res.send('api!');
    },

    paramV: (req, res, next) => {
        const paramValue = req.params.value;

        console.log(`param value: ${paramValue}`);

        const fileName = 'param.txt';
        fs.writeFile(`${FILES_DIR}/${fileName}`, paramValue, err => {
            if (err && err.code === 'ENOENT') {
                console.log(err);
                res.status(404).end();
                return;
            }
            if (err) {
                console.log(err);
                next(err);
                return;
            }

            res.json({ message: `'${paramValue}' saved to ${fileName}` });
        });
    },

    queryV: (req, res, next) => {
        const queryValue = req.query.value;

        console.log(`query value: ${queryValue}`);

        const fileName = 'query.txt';
        fs.writeFile(`${FILES_DIR}/${fileName}`, queryValue, err => {
            if (err && err.code === 'ENOENT') {
                console.log(queryValue);
                res.status(404).send(queryValue);
                return;
            }
            if (err) {
                console.log(queryValue);
                next(err);
                return;
            }

            res.json({ message: `'${queryValue}' saved to ${fileName}` });
        });
    },

    bodyV: (req, res, next) => {
        const bodyValue = req.body.value;

        console.log(`body value: ${bodyValue}`);

        const fileName = 'body.txt';
        fs.writeFile(`${FILES_DIR}/${fileName}`, bodyValue, err => {
            if (err && err.code === 'ENOENT') {
                console.log(err);
                res.status(404).end();
                return;
            }
            if (err) {
                console.log(err);
                next(err);
                return;
            }

            res.json({ message: `'${bodyValue}' saved to ${fileName}` });
        });
    }

};

module.exports = handlers;