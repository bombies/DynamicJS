const Command = require("../../structures/command");
const EmbedBuilder = require('../../structures/embedBuilder');
const Constants = require('../../constants/constants');
const Pages = require('../../utils/pagination/pages');
const ServerUtils = require('../../utils/database/serverUtils');

module.exports = new Command({
    name: 'help',
    help: {
        description: 'Get help for all the features of the bot',
        usage: 'help',
    },

    async run(message, args, client) {
        const eb = new EmbedBuilder();
        const guildPrefix = ServerUtils.getPrefix(message.guild.id);

        if (args.length === 0) {
            const description = [`**Prefix** \`${guildPrefix}\`\n`];
            client.commands.forEach(command => {
                description.push(`- \`${command.name}\``);
            });
            return Pages.paginateString(message.channel, message.author, description, Constants.pagination.HELP_PAGE_MAX);
        } else {
            if (client.commands.find(cmd => cmd.name === args[0].toLowerCase())) {
                const command = client.commands.get(args[0].toLowerCase());
                const aliases = command.aliases;
                return message.reply({ embeds: [eb.setDescription(
                    `**Description**: ${command.help.description}
                    **Aliases**: \`${(aliases !== undefined ? aliases : `None`)}\`
                    
                    **Usage**: \`${command.help.usage}\``,
                ).setAuthor({
                    name: `Help | [${command.name}]`,
                    iconURL: Constants.bot.IMAGE_URL
                })] });
            } else
                return message.reply({ embeds: [eb.setDescription(`\`${args[0]}\` isn't a valid command`)] });
        }
    },
});