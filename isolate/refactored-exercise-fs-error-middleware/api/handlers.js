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
        const filePath = `${FILE_DIR}/${name}`;
        //first check if the file exist using access
        fs.access(filePath, content, (err) => {
            if (err) {
                //not exist write file   
                fs.writeFile(`${FILE_DIR}/${name}`, content, (err) => {
                    if (err) {
                        next(err);
                        return;
                    }
                    console.error('new file created..' + name);
                    return res.send(name);
                });
            } else {
                //send exist msg
                console.error('file exist');
                return res.json('file exist');
            }
        });
    }
};

module.exports = handlers;