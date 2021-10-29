const Command = require('../../structures/command.js');
const EmbedBuilder = require('../../structures/embedBuilder.js');

module.exports = new Command({
    name: 'ping',
    help: {
        description: 'Shows the ping of the bot to discord\'s servers',
        usage: 'ping',
    },
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        
        const eb = new EmbedBuilder();
        const msgPing = Date.now() - message.createdTimestamp;
        eb.setDescription(`🏓 Ping : \`${client.ws.ping} ms\`\n\n**Message Ping**: \`${msgPing} ms\``);
        message.reply({ embeds: [eb] });
    },
});