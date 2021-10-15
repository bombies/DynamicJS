const Event = require('../structures/event');
const ServerUtils = require("../utils/database/serverUtils");

module.exports = new Event('messageCreate', (client, message) => {
    const guildPrefix = ServerUtils.getPrefix(message.guild.id);

    if (!message.content.startsWith(guildPrefix)) return;

    const args = message.content.substring(guildPrefix.length).split(/ +/);

    let command = client.commands.find(cmd => cmd.name === args[0].toLowerCase());

    if (!command) {
        client.commands.forEach(cmd => {
            cmd.aliases !== undefined ? (cmd.aliases.includes(args[0].toLowerCase()) ? command = cmd : undefined) : false;
        });

        if (!command) return;
    }

    args.splice(0, 1);

    command.run(message, args, client);
});