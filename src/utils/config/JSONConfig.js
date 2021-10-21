const fs = require('fs');
const axios = require("axios");
const GeneralUtils = require("../generalUtils");
const Constants = require("../../constants/constants");
const FileHandlingError = require("../../exceptions/FileHandlingError");

class JSONConfig {
    static #jsonConstants = Constants.json;

    /**
     *
     * @param {string} file Name of the JSON config file
     */
    constructor(file) {
        "use strict";
        this.file = file;
        this.directory = JSONConfig.#jsonConstants.config.directory;
        this.path = `${this.directory}/${file}.json`;
    }

    makeFile() {
        "use strict";
        let newConfig = false;

        if (!GeneralUtils.pathExists(this.directory))
            GeneralUtils.mkdir(this.directory);

        if (!GeneralUtils.pathExists(this.path)) {
            GeneralUtils.createNewFile(this.path)
            newConfig = true;
        }

        if (!newConfig) throw new FileHandlingError('File already exists');
    }

    /**
     *
     * @param {Function} callback - Callback with the JSON string as the parameter
     */
    getJSONString(callback) {
        fs.readFile(this.path, 'utf8', (err, jsonString) => {
            if (err)
                throw new FileHandlingError('There was an error reading from the JSON file');

            callback(jsonString);
        })
    }

    /**
     *
     * @param {Function} callback - Callback with the JSON Object as a parameter
     */
    getJSONObject(callback) {
        this.getJSONString(json => {
            callback(JSON.parse(json));
        });
    }

    /**
     *
     * @param {Object} json
     */
    async setJSON(json) {
        const jsonString = JSON.stringify(json, null, 4);
        await fs.writeFileSync(this.path, jsonString, {
            encoding: 'utf8',
            flag: 'w'
        });
    }
}

module.exports = JSONConfig;