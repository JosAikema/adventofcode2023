fs = require('fs')

module.exports = {
    processInput (inputFile, noSplit = false) {
        if (noSplit) {
            return fs.readFileSync(inputFile, 'utf8');
        } else {
            return fs.readFileSync(inputFile, 'utf8').split('\n');
        }
        
    },
    
}
