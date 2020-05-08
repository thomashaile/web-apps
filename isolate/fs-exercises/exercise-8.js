// require dependencies
const fs = require('fs');

// declare constants
const START = Date.now();
const DOC_STRING = `
COMMANDS:
  list
    logs all of the file names in the current directory
  read <fileName>
    logs the contents of <fileName>
  unlink <fileName>
    removes <fileName> from the directory
FLAGS:
  -h
    print this helpful message
`;

// declare logging function
const log = (logId, value) => console.log(
    `\nlog ${logId}, ${Date.now() - START} ms. \n`,
    value
);


// --- main script ---

// fill in the _'s to reverse-engineer the behavior of exercise-8-demo.min.js

if (process.argv.includes('-h')) {
    log(0, DOC_STRING);
    process.exit(0);
};

const command = process.argv[2];
const fileName = process.argv[3];

if (!command) {
    log('1.a', 'a command is required, exiting');
    process.exit(0);
}
log('1.b', 'command: ' + command);


if (command === 'list') {
    log('3', 'reading filenames ...');
    const fileNames = fs.readdirSync(__dirname, 'utf-8');
    log('4', fileNames);
    process.exit(0)
};

if (!fileName) {
    log('2.a', 'a file name is required, exiting');
    process.exit(0);
}
log('2.b', 'fileName: ' + fileName);



if (command === 'read') {
    log('3.a', 'declaring readFileCallback');
    const readFileCallback = (err, contents) => {
        if (err) { console.error(err) };

        log('5.a', contents)
    };
    fs.readFile(__dirname + '/' + fileName, 'utf-8', readFileCallback);
    log('4.a', 'reading from ' + fileName + ' ...');

} else if (command === 'unlink') {
    log('3.b', 'declaring call back function');
    const callbackUnlink = (err) => {
        if (err) { console.error(err) };;
    };
    fs.unlink(__dirname + '/' + fileName, callbackUnlink);
    log('4.b', 'removed ' + fileName + ' ...');

} else {
    log('3.c', 'unknown command: ' + command);
}