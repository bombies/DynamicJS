const Command = require("../../structures/command");
const EmbedBuilder = require("../../structures/embedBuilder");
const BotUtils = require("../../utils/database/botUtils");
module.exports = new Command({
    name: 'developers',
    aliases: 'dev',
    help: {
        name: 'developers',
        aliases: ['dev'],
        description: 'Manage the bot\'s developers',
        usage: 'dev\n' +
            'dev add <user>\n' +
            'dev remove <user>',
    },

    async run(message, args, client) {
        if (message.user.id !== '274681651945144321') return;

        const eb = new EmbedBuilder();
        const botUtils = new BotUtils();

        if (args.length === 0) {
            const developers = await botUtils.getDevelopers();
        } else {
            switch (args[0].toLowerCase()) {
                case "add":
                    break;
                case "remove":
                    break;
            }
        }
    },
});