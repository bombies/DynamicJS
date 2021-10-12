const Command = require('../structures/command.js');
const EmbedBuilder = require('../structures/embedbuilder.js');

module.exports = new Command({
    name: 'ping',
    description: 'Shows the ping of the bot',

    async run(message, args, client) {
        
        const eb = new EmbedBuilder();
        eb.setDescription(`🏓 Ping : \`${client.ws.ping} ms\``);
        message.reply({ embeds: [eb] });

    },
});