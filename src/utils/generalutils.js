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
}

module.exports = GeneralUtils;