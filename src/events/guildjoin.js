const Event = require('../structures/event');
const BotUtils = require('../utils/database/botutils');
const ServerUtils = require("../utils/database/serverutils");

module.exports = new Event('guildCreate', (client, guild) => {
    const botUtils = new BotUtils();
    botUtils.addGuild(guild.id);
    // botUtils.closeConnection();

    ServerUtils.addGuildToPrefixMap(guild.id);
});