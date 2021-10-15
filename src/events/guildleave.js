const Event = require("../structures/event");
const BotUtils = require("../utils/database/botutils");
const ServerUtils = require("../utils/database/serverutils");

module.exports = new Event('guildDelete', (client, guild) => {
    const botUtils = new BotUtils();
    botUtils.removeGuild(guild.id).closeConnection(); // Removes the guild from the bot's database once the bot has left the guild.
    ServerUtils.removeGuildFromPrefixMap(guild.id);
});