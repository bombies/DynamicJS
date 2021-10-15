const Event = require("../structures/event");
const BotUtils = require("../utils/database/botUtils");
const ServerUtils = require("../utils/database/serverUtils");

module.exports = new Event('guildDelete', (client, guild) => {
    const botUtils = new BotUtils();
    botUtils.removeGuild(guild.id).closeConnection(); // Removes the guild from the bot's database once the bot has left the guild.
    ServerUtils.removeGuildFromPrefixMap(guild.id);
});