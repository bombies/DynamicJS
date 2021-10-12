const Command = require('../structures/command');
const EmbedBuilder = require('../structures/embedbuilder');

module.exports = new Command({
    name: 'whois',
    description: 'Get information about a user',

    async run(message, args, client) {
        const eb = new EmbedBuilder();

        if (args.length == 0) {
            eb.setDescription('You must provide a user to lookup');
            message.reply({ embeds: [eb] });
            return;
        }
        

        client.users.fetch(args[0]).then(function(user) {
            console.log(user);
            message.reply(user.username);
        });
    },
});