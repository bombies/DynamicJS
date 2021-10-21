const fs = require('fs');
const Constants = require('../constants/constants');
const EmbedBuilder = require('../structures/embedBuilder');

class GeneralUtils {
    /**
     *
     * @param {string} arg
     */
    static isHex(arg) {
        return arg.match(/^#[0-9a-fA-F]{6}$/g);
    }

    /**
     *
     * @param {string} arg
     */
    static isEmoji(arg) {
        return arg.match(Constants.bot.EMOJI_REGEX);
    }

    /**
     *
     * @param {string} prefix
     * @param {string} string
     */
    static emojiPrefix(prefix, string) {
        return prefix + '**‖**  ' + string;
    }

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
     * @param {Number} num
     * @param {Number} minDp
     * @param {Number} maxDp
     */
    static formatNumber(num, minDp = 2, maxDp = 2) {
        return num.toLocaleString('en-US', { minimumFractionDigits: minDp, maximumFractionDigits: maxDp });
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
    static pathExists(dir) {
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