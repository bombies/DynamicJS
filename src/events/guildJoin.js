const Event = require('../structures/event');
const BotUtils = require('../utils/database/botUtils');
const ServerUtils = require("../utils/database/serverUtils");

module.exports = new Event('guildCreate', (client, guild) => {
    const botUtils = new BotUtils();
    botUtils.addGuild(guild.id);
    // botUtils.closeConnection();

    ServerUtils.addGuildToPrefixMap(guild.id);
});