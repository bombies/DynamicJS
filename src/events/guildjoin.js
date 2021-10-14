const Event = require('../structures/event');
const BotUtils = require('../utils/database/botutils');

module.exports = new Event('guildCreate', (client, guild) => {
    const botUtils = new BotUtils();
    botUtils.addGuild(guild.id).closeConnection(); // Adding the new guild to the bot's database
});