const Command = require('../structures/command.js');
const config = require('../config.json');
const EmbedBuilder = require('../structures/embedbuilder.js');
const GeneralUtils = require('../utils/generalutils.js');

module.exports = new Command({
    name: 'setprefix',
    description: 'Sets the prefix of the bot',

    async run(message, args, client) {
		config.prefix = args[1];

		GeneralUtils.updateJSONFile('config.json', config);

        const eb = new EmbedBuilder().setDescription(`You have set the prefix of the bot to \`${args[1]}\``);
        message.reply({ embeds: [eb] });
    },
});