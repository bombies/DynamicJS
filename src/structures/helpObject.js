const config = require('../../config.json');

class HelpObject {
    /**
     * @typedef {{description: string, usage: string, aliases?: string[]}} HelpOptions
     * @param {HelpOptions} options 
     */
    constructor(options) {
        this.description = options.description;
        this.usage = options.usage;
        this.aliases = options.aliases;
    }
}

module.exports = HelpObject;