const EmbedBuilder = require("../structures/embedbuilder");
const Event = require("../structures/event");

module.exports = new Event('ready', (client) => {
    /**
     * @type {EmbedBuilder}
     */
    EmbedBuilder.defaultColor('#e8172d');
    console.log("Bot is ready to go!");
});