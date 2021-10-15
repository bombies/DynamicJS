const Event = require('../structures/event');
const ServerUtils = require("../utils/database/serverutils");

module.exports = new Event('messageCreate', async (client, message) => {
    const guildPrefix = ServerUtils.getPrefix(message.guild.id);

    if (!message.content.startsWith(guildPrefix)) return;

    const args = message.content.substring(guildPrefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name === args[0]);

    if (!command) return;

    args.splice(0, 1);

    command.run(message, args, client);
});