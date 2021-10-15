const Command = require("../../structures/command");
const EmbedBuilder = require('../../structures/embedbuilder');
const Constants = require('../../constants/constants');
const Pages = require('../../utils/pagination/pages');
const ServerUtils = require('../../utils/database/serverutils');

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
                return message.reply({ embeds: [eb.setDescription(
                    `**Description**: ${command.help.description}
                    
                    **Usage**: \`${command.help.usage}\``,
                ).setAuthor(`Help | [${command.name}]`, Constants.bot.IMAGE_URL)] });
            } else
                return message.reply({ embeds: [eb.setDescription(`\`${args[0]}\` isn't a valid command`)] });
        }
    },
});