const Event = require('../structures/event');
const ServerUtils = require("../utils/database/serverutils");

module.exports = new Event('messageCreate', async (client, message) => {
    const guildPrefix = await new ServerUtils()
        .getPrefix(message.guild.id);

    console.log(guildPrefix);

    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.substring(client.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name === args[0]);

    if (!command) return;

    args.splice(0, 1);

    command.run(message, args, client);
});