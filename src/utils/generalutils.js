const fs = require('fs');

class GeneralUtils {
    /**
     * 
     * @param {string} fileName 
     * @param {File} file 
     */
    static updateJSONFile(fileName, file) {
        fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
        });
    }

    /**
     * 
     * @param {Number} bound 
     * @returns 
     */
    static getRandomInt(bound) {
        return Math.floor(Math.random() * bound);
    }
}

module.exports = GeneralUtils;