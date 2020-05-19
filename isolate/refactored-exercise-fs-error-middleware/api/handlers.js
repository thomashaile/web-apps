const fs = require('fs');
const path = require('path');
const config = require('../config');

const FILE_DIR = path.join(__dirname, '/..', config.FILES_DIR);

const handlers = {
    home: (req, res, next) => {
        res.send('home page!');
    },
    list: (req, res, next) => {
        fs.readdir(FILE_DIR, (err, data) => {
            if (err) {
                next(err)
                return
            }
            console.log('this is the directory listing', data)
            res.json(data)
        })
    },
    create: (req, res, next) => {
        const name = req.params.name;
        const content = req.body.fileContent;

        fs.writeFile(`${FILE_DIR}/${name}`, content, (err) => {

            if (err) {
                next(err)
                return
            }
            return res.send(name)
        });
    }
};

module.exports = handlers;