const { MessageEmbed } = require("discord.js");
const EmbedBuilder = require('../../structures/embedBuilder');

class Page {
    /**
     * 
     * @param {EmbedBuilder | MessageEmbed} embed 
     */
    constructor(embed) {
        this.embed = embed;
        this.pageContent = embed.description;
    }
}

module.exports = Page;