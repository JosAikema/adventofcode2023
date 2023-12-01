fs = require('fs')

module.exports = {
    processInput (inputFile) {
        return fs.readFileSync(inputFile, 'utf8').split('\n');
    }
}
