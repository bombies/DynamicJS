const Command = require('../../structures/command.js');
const config = require('../../config.json');
const EmbedBuilder = require('../../structures/embedBuilder.js');
const GeneralUtils = require('../../utils/generalUtils.js');
const ServerUtils = require("../../utils/database/serverUtils");

module.exports = new Command({
    name: 'setprefix',
    help: {
        description: 'Set the prefix for the bot',
        usage: 'setprefix <prefix>',
    },
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        const eb = new EmbedBuilder();
        
        if (args.length === 0) {
            eb.setDescription('You must provide a new prefix');
            message.reply({ embeds: [eb] });
            return;
        }

        const serverUtils = new ServerUtils();
        serverUtils.setPrefix(message.guild.id, args[0]);

        eb.setDescription(`You have set the prefix of the bot to \`${args[0]}\``);
        message.reply({ embeds: [eb] });
    },
});