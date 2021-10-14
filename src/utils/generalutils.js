const fs = require('fs');
const Constants = require('../constants/constants');
const EmbedBuilder = require('../structures/embedbuilder');

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

    static setDefaultEmbed() {
        EmbedBuilder.defaultColor(Constants.bot.DEF_EMBED_COLOR);
        EmbedBuilder.defaultAuthor(Constants.bot.NAME, Constants.bot.IMAGE_URL);
    }

    /**
     * 
     * @param {string} authorName 
     * @param {string} authorImage 
     * @param {import('discord.js').ColorResolvable} color 
     */
    static setCustomEmbed(authorName, authorImage = Constants.bot.IMAGE_URL, color = Constants.bot.DEF_EMBED_COLOR) {
        EmbedBuilder.defaultAuthor(authorName, authorImage);
        EmbedBuilder.defaultColor(color);
    }

    /**
     * 
     * @param {string} id 
     */
    static isID(id) {
        return id.match(/[0-9]{18}/g);
    }

    /**
     * 
     * @param {String} string 
     */
    static getDigitsOnly(string) {
        return string.replace(/\D/g, '');
    }

    /**
     * 
     * @param {string} dir 
     * @returns If the passed directory exists
     */
    static dirExists(dir) {
        return fs.existsSync(`./${dir}`);
    }

    /**
     * 
     * @param {string} dir 
     */
    static mkdir(dir) {
        fs.mkdir(dir, err => {
            if (err)
            throw err;
        });
        console.log(`${dir} created`);
    }

    /**
     * 
     * @param {string} path 
     */
    static createNewFile(path) {
        fs.open(path, 'w', (err, fd) => {
            if (err)
                throw err;
            fs.close(fd);    
        });
    }
}

module.exports = GeneralUtils;